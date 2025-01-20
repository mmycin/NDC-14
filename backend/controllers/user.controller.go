package controllers

import (
	"fmt"
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v4"
	"github.com/mmycin/ndc14/config"
	"github.com/mmycin/ndc14/models"
	"golang.org/x/crypto/bcrypt"
)

func SignUp(c *gin.Context) {
	var Body struct {
		FullName string `json:"fullName" gorm:"not null"`
		Username string `json:"username" gorm:"not null"`
		Password string `json:"password" gorm:"not null"`
		Email    string `json:"email" gorm:"unique;not null"`
		Roll     string `json:"roll" gorm:"unique;not null"`
		Batch    int    `json:"batch" gorm:"not null"`
		Phone    string `json:"phone" gorm:"not null"`
		FBLink   string `json:"fbLink" gorm:"not null"`
		IsAdmin  bool   `json:"isAdmin" gorm:"default:false;not null"`
	}

	if err := c.ShouldBindJSON(&Body); err != nil {
		c.JSON(400, gin.H{
			"Error": "Failed to read body",
		})
		return
	}

	// Trim any whitespace from password
	// Body.Password = strings.TrimSpace(Body.Password)

	if len(Body.Password) < 1 {
		c.JSON(400, gin.H{
			"error": "Password cannot be empty",
		})
		return
	}

	// Hash password with specific cost
	hash, err := bcrypt.GenerateFromPassword([]byte(Body.Password), bcrypt.DefaultCost)
	fmt.Println(hash)
	if err != nil {
		fmt.Printf("Password hashing error: %v\n", err)
		c.JSON(400, gin.H{
			"error": "Failed to hash password",
		})
		return
	}

	// Create user with trimmed and properly hashed password
	user := models.User{
		FullName: Body.FullName,
		Username: Body.Username,
		Email:    Body.Email,
		// Password: string(hash),
		Password: string(hash),
		Roll:     Body.Roll,
		Batch:    Body.Batch,
		Phone:    Body.Phone,
		FBLink:   Body.FBLink,
		IsAdmin:  Body.IsAdmin,
	}

	result := config.DB.Create(&user)
	if result.Error != nil {
		fmt.Printf("Database error during user creation: %v\n", result.Error)
		c.JSON(http.StatusBadGateway, gin.H{
			"error": "Error creating User",
		})
		return
	}

	// Log success but don't expose hash in response
	fmt.Printf("Successfully created user with roll: %s\n", user.Roll)

	c.JSON(http.StatusOK, gin.H{
		"message": "User created successfully",
		"data": gin.H{
			"id":        user.ID,
			"roll":      user.Roll,
			"email":     user.Email,
			"fbLink":    user.FBLink,
			"isAdmin":   user.IsAdmin,
			"fullName":  user.FullName,
			"username":  user.Username,
			"batch":     user.Batch,
			"phone":     user.Phone,
			"createdAt": user.CreatedAt,
			"updatedAt": user.UpdatedAt,
			"deletedAt": user.DeletedAt,
		},
	})
}

func Login(c *gin.Context) {
	var Body struct {
		Username string `json:"username" gorm:"not null"`
		Roll     string `json:"roll" gorm:"unique;not null"`
		Password string `json:"password" gorm:"not null"`
	}

	if err := c.ShouldBindJSON(&Body); err != nil {
		c.JSON(400, gin.H{
			"Error": "Failed to read body",
		})
		return
	}

	// Trim any whitespace from password
	Body.Password = strings.TrimSpace(Body.Password)

	var user models.User
	if err := config.DB.Where("roll = ?", Body.Roll).First(&user).Error; err != nil {
		fmt.Printf("User lookup error for roll %s: %v\n", Body.Roll, err)
		c.JSON(http.StatusUnauthorized, gin.H{
			"error": "Invalid credentials",
		})
		return
	}

	// Add logging to check password lengths and content
	fmt.Printf("Login attempt for roll: %s\n", Body.Roll)
	fmt.Printf("Stored hash length: %d\n", len(user.Password))
	fmt.Printf("Provided password length: %d\n", len(Body.Password))

	// Compare hashed password with the entered password
	err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(Body.Password))
	// err := strings.Compare(Body.Password, user.Password)
	if err != nil {
		fmt.Printf("Password comparison error for roll %s: %v\n", Body.Roll, err)
		c.JSON(http.StatusUnauthorized, gin.H{
			"error": "Invalid password",
		})
		return
	}

	// Generate JWT token
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"sub": user.ID,
		"exp": time.Now().Add(time.Hour * 24).Unix(),
	})

	tokenString, err := token.SignedString([]byte(os.Getenv("SECRET")))
	if err != nil {
		c.JSON(http.StatusBadGateway, gin.H{
			"error": "Error creating token",
		})
		return
	}

	c.SetSameSite(http.SameSiteLaxMode)
	c.SetCookie("Authorization", tokenString, 3600*24, "", "", false, true)

	c.JSON(http.StatusOK, gin.H{
		"token": tokenString,
	})
}

func Validate(c *gin.Context) {
	user, _ := c.Get("user")
	c.JSON(http.StatusOK, gin.H{
		"message": "You are logged in",
		"data":    user,
	})
}

func Logout(c *gin.Context) {
	// Clear the Authorization cookie by setting its max age to -1
	c.SetSameSite(http.SameSiteLaxMode)
	c.SetCookie("Authorization", "", -1, "", "", false, true)

	c.JSON(http.StatusOK, gin.H{
		"message": "Successfully logged out",
	})
}

func UpdateUser(c *gin.Context) {
	id := c.Param("id")
	var existingUser models.User

	// Check if user exists
	if err := config.DB.First(&existingUser, "id = ?", id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	// Parse JSON payload
	var updates models.User
	if err := c.ShouldBindJSON(&updates); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}

	// Apply updates to fields manually (to avoid overwriting unwanted fields)
	if updates.FullName != "" {
		existingUser.FullName = updates.FullName
	}
	if updates.Username != "" {
		existingUser.Username = updates.Username
	}
	if updates.Email != "" {
		existingUser.Email = updates.Email
	}
	if updates.Roll != "" {
		existingUser.Roll = updates.Roll
	}
	if updates.Batch != 0 {
		existingUser.Batch = updates.Batch
	}
	if updates.FBLink != "" {
		existingUser.FBLink = updates.FBLink
	}
	if updates.Phone != "" {
		existingUser.Phone = updates.Phone
	}
	if updates.IsAdmin != existingUser.IsAdmin {
		existingUser.IsAdmin = updates.IsAdmin
	}

	// Handle password update (hash it)
	if updates.Password != "" {
		// Hash the password before saving
		hashedPassword, err := bcrypt.GenerateFromPassword([]byte(updates.Password), bcrypt.DefaultCost)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to hash password"})
			return
		}
		existingUser.Password = string(hashedPassword)
	}

	// Update user in database
	if err := config.DB.Save(&existingUser).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update user"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "User updated successfully",
		"data":    existingUser,
	})
}

func DeleteUser(c *gin.Context) {
	// Get the user ID from the URL parameters
	id := c.Param("id")
	var existingUser models.User

	// Retrieve the user from the database
	if err := config.DB.Where("id = ?", id).First(&existingUser).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	// Proceed with deleting the user
	if err := config.DB.Delete(&existingUser).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete user"})
		return
	}

	// Return success message
	c.JSON(http.StatusOK, gin.H{"message": "User deleted successfully"})
}

func GetUsers(c *gin.Context) {
	var users []models.User
	if err := config.DB.Find(&users).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Unable to fetch users"})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"data": users,
	})
}

func GetUserByID(c *gin.Context) {
	var user models.User
	id := c.Param("id")

	if err := config.DB.First(&user, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "User not found",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"data": user,
	})
}

func GetUserByUsername(c *gin.Context) {
	var user models.User
	username := c.Param("username")

	if err := config.DB.Where("username = ?", username).First(&user).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "User not found",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"data": user,
	})
}

func GetUserByRoll(c *gin.Context) {
	var user models.User
	roll := c.Param("roll")

	if err := config.DB.Where("roll = ?", roll).First(&user).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "User not found",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"data": user,
	})
}

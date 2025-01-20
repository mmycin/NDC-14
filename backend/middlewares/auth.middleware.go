package middlewares

import (
	"fmt"
	"net/http"
	"os"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v4"
	"github.com/mmycin/ndc14/config"
	"github.com/mmycin/ndc14/models"
)

func RequireAuth(c *gin.Context) {
	tokenString, err := c.Cookie("Authorization")
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"message": "You are not logged in",
		})
		c.Abort() // Make sure to stop further execution of the request
		return
	}

	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		// Don't forget to validate the alg is what you expect:
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}

		// hmacSampleSecret is a []byte containing your secret, e.g. []byte("my_secret_key")
		return []byte(os.Getenv("SECRET")), nil
	})

	if err != nil || token == nil || !token.Valid {
		c.JSON(http.StatusUnauthorized, gin.H{
			"message": "You are not logged in",
		})
		c.Abort() // Ensure the request does not continue
		return
	}

	// Token is valid, now check the claims
	if claims, ok := token.Claims.(jwt.MapClaims); ok {
		// Check expiration
		if float64(time.Now().Unix()) > claims["exp"].(float64) {
			c.JSON(http.StatusUnauthorized, gin.H{
				"message": "You are not logged in",
			})
			c.Abort() // Ensure the request does not continue
			return
		}

		// Retrieve user using the 'sub' claim
		var user models.User
		if err := config.DB.First(&user, claims["sub"]).Error; err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{
				"message": "User not found",
			})
			c.Abort() // Ensure the request does not continue
			return
		}

		// Set user in context
		c.Set("user", user)

		// Continue processing request
		c.Next()

	} else {
		c.JSON(http.StatusUnauthorized, gin.H{
			"message": "You are not logged in",
		})
		c.Abort() // Ensure the request does not continue
		return
	}
}

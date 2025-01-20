package tests

import (
	"bytes"
	"encoding/json"
	"log"
	"net/http"
	"testing"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"github.com/mmycin/ndc14/config"
	"github.com/mmycin/ndc14/libs"
	"github.com/mmycin/ndc14/models"
	"github.com/mmycin/ndc14/routes"
	"github.com/stretchr/testify/assert"
)

var testRouter *gin.Engine

func Setup() {
	// Load environment variables and connect to DB
	err := godotenv.Load("../.env") // Adjust the path to where the actual .env file is
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	config.ConnectDB()

	// Create and configure router
	testRouter = gin.Default()

	// Setup routes
	api := testRouter.Group("/api/v2")
	routes.SetupUserRoutes(api.Group("/users"))
}

func TestSignUp(t *testing.T) {
	Setup()

	// Create user data
	newUser := models.User{
		FullName: "John Doe",
		Username: "john_doe",
		Email:    "john.doe@example.com",
		Roll:     "12345",
		Batch:    2024,
		FBLink:   "https://facebook.com/john.doe",
		Password: "password123",
	}

	// Convert to JSON
	data, err := json.Marshal(newUser)
	assert.NoError(t, err)

	// Send POST request to /api/v2/users/signup
	req, err := http.NewRequest("POST", "/api/v2/users/signup", bytes.NewReader(data))
	assert.NoError(t, err)

	// Perform the request
	recorder := libs.NewTestResponseRecorder()
	testRouter.ServeHTTP(recorder, req)

	// Assert that the response code is OK
	assert.Equal(t, http.StatusOK, recorder.Code)

	// Assert that the response body contains the message 'user created successfully'
	var response map[string]interface{}
	err = json.Unmarshal(recorder.Body.Bytes(), &response)
	assert.NoError(t, err)
	assert.Equal(t, "user created successfully", response["message"])
}

func TestLogin(t *testing.T) {
	Setup()

	// Create login data
	loginData := map[string]interface{}{
		"roll":     "12345",
		"password": "password123",
	}

	// Convert to JSON
	data, err := json.Marshal(loginData)
	assert.NoError(t, err)

	// Send POST request to /api/v2/users/login
	req, err := http.NewRequest("POST", "/api/v2/users/login", bytes.NewReader(data))
	assert.NoError(t, err)

	// Perform the request
	recorder := libs.NewTestResponseRecorder()
	testRouter.ServeHTTP(recorder, req)

	// Assert that the response code is OK
	assert.Equal(t, http.StatusOK, recorder.Code)

	// Assert that the response contains a token
	var response map[string]interface{}
	err = json.Unmarshal(recorder.Body.Bytes(), &response)
	assert.NoError(t, err)
	_, exists := response["token"]
	assert.True(t, exists)
}

func TestValidate(t *testing.T) {
	Setup()

	// Create valid token for authorization (you would need a valid token generation in a real test scenario)
	token := "valid.jwt.token" // Replace with an actual token generated from Login endpoint

	req, err := http.NewRequest("GET", "/api/v2/users/validate", nil)
	assert.NoError(t, err)

	// Add authorization token in header
	req.Header.Set("Authorization", "Bearer "+token)

	// Perform the request
	recorder := libs.NewTestResponseRecorder()
	testRouter.ServeHTTP(recorder, req)

	// Assert that the response code is OK
	assert.Equal(t, http.StatusOK, recorder.Code)

	// Assert that the response body contains "You are logged in"
	var response map[string]interface{}
	err = json.Unmarshal(recorder.Body.Bytes(), &response)
	assert.NoError(t, err)
	assert.Equal(t, "You are logged in", response["message"])
}

func TestUpdateUser(t *testing.T) {
	Setup()

	// Create valid token for authorization (replace with an actual token)
	token := "valid.jwt.token" // Replace with an actual token generated from Login endpoint

	// User update data
	updateData := map[string]interface{}{
		"fullName": "Updated Name",
		"email":    "updated@example.com",
	}

	// Convert to JSON
	data, err := json.Marshal(updateData)
	assert.NoError(t, err)

	// Send PUT request to /api/v2/users/update
	req, err := http.NewRequest("PUT", "/api/v2/users/update", bytes.NewReader(data))
	assert.NoError(t, err)

	// Add authorization token in header
	req.Header.Set("Authorization", "Bearer "+token)

	// Perform the request
	recorder := libs.NewTestResponseRecorder()
	testRouter.ServeHTTP(recorder, req)

	// Assert that the response code is OK
	assert.Equal(t, http.StatusOK, recorder.Code)

	// Assert that the response body contains "User updated successfully"
	var response map[string]interface{}
	err = json.Unmarshal(recorder.Body.Bytes(), &response)
	assert.NoError(t, err)
	assert.Equal(t, "User updated successfully", response["message"])
}

func TestDeleteUser(t *testing.T) {
	Setup()

	// Create valid token for authorization (replace with an actual token)
	token := "valid.jwt.token" // Replace with an actual token generated from Login endpoint

	// User delete data
	deleteData := map[string]interface{}{
		"roll": "12345",
	}

	// Convert to JSON
	data, err := json.Marshal(deleteData)
	assert.NoError(t, err)

	// Send DELETE request to /api/v2/users/delete
	req, err := http.NewRequest("DELETE", "/api/v2/users/delete", bytes.NewReader(data))
	assert.NoError(t, err)

	// Add authorization token in header
	req.Header.Set("Authorization", "Bearer "+token)

	// Perform the request
	recorder := libs.NewTestResponseRecorder()
	testRouter.ServeHTTP(recorder, req)

	// Assert that the response code is OK
	assert.Equal(t, http.StatusOK, recorder.Code)

	// Assert that the response body contains "User deleted successfully"
	var response map[string]interface{}
	err = json.Unmarshal(recorder.Body.Bytes(), &response)
	assert.NoError(t, err)
	assert.Equal(t, "Your account has been deleted successfully", response["message"])
}

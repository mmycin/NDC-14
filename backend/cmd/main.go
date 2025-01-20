package main

import (
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/mmycin/ndc14/config"
	"github.com/mmycin/ndc14/libs"
	"github.com/mmycin/ndc14/middlewares"
	"github.com/mmycin/ndc14/routes"
)

func init() {
	config.LoadEnv()
	config.ConnectDB()
	// config.SyncDatabase()
}

func main() {
	router := gin.Default()
	router.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"message": "Server Connected. Now you can start using the API form /api/v2 route"})
	})

	router.GET("/api/v2", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"message": "Connected to the API. It was created by Tahcin Ul Karim (Mycin) - 12514013"})
	})
	router.GET("/api/", func(c *gin.Context) {
		http.Redirect(c.Writer, c.Request, "/api/v2", http.StatusMovedPermanently)
	})

	// Configure CORS
	router = middlewares.ConfigCors(router)

	// Create an API group
	api := router.Group("/api/v2")

	// Setup routes under the /api prefix
	routes.SetupUserRoutes(api.Group("/users"))
	routes.SetupNoticeRoutes(api.Group("/notices"))
	routes.SetupContactRoutes(api.Group("/contacts"))

	// Start server
	libs.Success("Starting server at " + os.Getenv("HOST") + ":" + os.Getenv("PORT"))
	router.Run(os.Getenv("HOST") + ":" + os.Getenv("PORT"))
}

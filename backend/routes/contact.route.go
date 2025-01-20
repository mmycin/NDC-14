package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/mmycin/ndc14/controllers"
)

func SetupContactRoutes(group *gin.RouterGroup) {
	// Public route - anyone can create a contact
	group.POST("/", controllers.CreateContact)

	// Protected routes - require authentication
	group.GET("/", controllers.GetContacts)
	group.GET("/:id", controllers.GetContact)
	group.DELETE("/:id", controllers.DeleteContact)
}

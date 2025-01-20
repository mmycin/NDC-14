package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/mmycin/ndc14/controllers"
)

func SetupNoticeRoutes(group *gin.RouterGroup) {
	group.GET("/", controllers.GetNotices)
	group.GET("/:id", controllers.GetNotice)
	group.POST("/", controllers.CreateNotice)
	group.PUT("/:id", controllers.UpdateNotice)
	group.DELETE("/:id", controllers.DeleteNotice)
}

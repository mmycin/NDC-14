package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/mmycin/ndc14/config"
	"github.com/mmycin/ndc14/libs"
	"github.com/mmycin/ndc14/models"
)

// CreateContact allows anyone to submit a contact form
func CreateContact(c *gin.Context) {
	var contact models.Contact
	if err := c.ShouldBindJSON(&contact); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid input data",
		})
		return
	}

	// Censor any inappropriate content before saving
	libs.Censor(&contact)

	if !libs.IsValidRoll(contact.Roll) {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid roll format. Must follow pattern: 1(2|3)x14xxx where x is any digit and last 3 digits between 001-150",
		})
		return
	}

	if err := config.DB.Create(&contact).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error":   "Failed to create contact",
			"details": err.Error(),
		})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message": "Contact created successfully",
		"data":    contact,
	})
}

// GetContacts requires authentication to list all contacts
func GetContacts(c *gin.Context) {
	var contacts []models.Contact

	if err := config.DB.Order("created_at DESC").Find(&contacts).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error":   "Unable to fetch contacts",
			"details": err.Error(),
		})
		return
	}

	// Censor content before sending response
	libs.Censor(&contacts)

	c.JSON(http.StatusOK, gin.H{
		"data":  contacts,
		"count": len(contacts),
	})
}

// GetContact requires authentication to get a specific contact
func GetContact(c *gin.Context) {
	contactID := c.Param("id")
	var contact models.Contact

	if err := config.DB.First(&contact, contactID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "Contact not found",
		})
		return
	}

	// Censor content before sending response
	libs.Censor(&contact)

	c.JSON(http.StatusOK, gin.H{
		"data": contact,
	})
}

// DeleteContact requires authentication to delete a contact
func DeleteContact(c *gin.Context) {
	// Get the authenticated user``
	contactID := c.Param("id")
	var contact models.Contact

	// Find the contact
	if err := config.DB.First(&contact, contactID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "Contact not found",
		})
		return
	}

	// Delete the contact
	if err := config.DB.Delete(&contact).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error":   "Failed to delete contact",
			"details": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Contact deleted successfully",
	})
}

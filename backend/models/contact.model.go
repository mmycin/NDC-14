package models

import "gorm.io/gorm"

type Contact struct {
	gorm.Model
	Name    string `json:"name" gorm:"not null"`
	Email   string `json:"email" gorm:"not null"`
	Roll    string `json:"roll" gorm:"not null"`
	Message string `json:"message" gorm:"not null"`
}

package models

import "gorm.io/gorm"

type User struct {
	gorm.Model
	FullName string `json:"fullName" gorm:"column:full_name;not null"`
	Username string `json:"username" gorm:"not null"`
	Password string `json:"password" gorm:"not null"`
	Email    string `json:"email" gorm:"unique;not null"`
	Roll     string `json:"roll" gorm:"unique;not null"`
	Batch    int    `json:"batch" gorm:"not null"`
	Phone    string `json:"phone" gorm:"not null"`
	FBLink   string `json:"fbLink" gorm:"not null"`
	IsAdmin  bool   `json:"isAdmin" gorm:"default:false;not null"`
}

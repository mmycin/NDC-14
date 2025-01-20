package models

import "gorm.io/gorm"

type Notice struct {
	gorm.Model
	Year      int    `json:"year" gorm:"not null"`  // Year of the notice
	Title     string `json:"title" gorm:"not null"` // Title of the notice
	Date      string `json:"date" gorm:"not null"`  // Date of the notice
	Content   string `json:"content" gorm:"not null"`
	CreatorID int    `json:"added_by"`
	UpdaterID int    `json:"updated_by"`
	Files     []File `json:"files,omitempty" gorm:"foreignKey:NoticeID"` // Associated files
}

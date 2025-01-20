package models

import "gorm.io/gorm"

type File struct {
	gorm.Model `json:"-"`
	Filename   string `json:"filename"` // Name of the file
	Index      string `json:"index"`    // Index for ordering or identification
	NoticeID   uint   `json:"-"`        // Foreign key linking to Notice
}

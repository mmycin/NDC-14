package config

import (
	"os"

	"github.com/mmycin/ndc14/libs"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

// ConnectDB initializes and connects to the database.
func ConnectDB() {
	dsn := os.Getenv("DB_URL")
	if dsn == "" {
		libs.Fatal("DB_URL environment variable is not set")
	}
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		libs.Fatal("Error connecting to database: " + err.Error())
	}

	DB = db
	libs.TimeElapsed(func() {
		libs.Success("Connected to database")
	})
}

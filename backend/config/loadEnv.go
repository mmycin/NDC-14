package config

import (
	"os"

	"github.com/joho/godotenv"
	"github.com/mmycin/ndc14/libs"
)

func LoadEnv() {
	// Skip loading .env file if we're in production
	if os.Getenv("GO_ENV") == "production" {
		libs.Success("Running in production mode - using environment variables")
		return
	}

	// Load .env file for development
	err := godotenv.Load()
	if err != nil {
		cwd, _ := os.Getwd()
		libs.Warning("No .env file found in " + cwd + " - using environment variables")
		return // Don't fatal in this case, just warn
	}
	libs.Success("Loaded .env file")
}

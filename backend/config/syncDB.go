package config

import (
	"fmt"
	"sync"

	"github.com/mmycin/ndc14/libs"
	"github.com/mmycin/ndc14/models"
)

func SyncDatabase() {
	libs.TimeElapsed(func() {
		DB.Exec("SET FOREIGN_KEY_CHECKS = 0")
		modelsToMigrate := []any{
			&models.User{},
			&models.Notice{},
			&models.Contact{},
		}

		// Create a worker pool with number of workers equal to CPU cores or a reasonable fixed number
		numWorkers := 3 // You can adjust this based on your needs
		jobs := make(chan any, len(modelsToMigrate))
		errChan := make(chan error, len(modelsToMigrate))
		var wg sync.WaitGroup

		// Start workers
		for i := 0; i < numWorkers; i++ {
			wg.Add(1)
			go func() {
				defer wg.Done()
				for model := range jobs {
					if err := DB.AutoMigrate(model); err != nil {
						errChan <- fmt.Errorf("failed to migrate model: %v", err)
					}
				}
			}()
		}

		// Send jobs to workers
		for _, model := range modelsToMigrate {
			jobs <- model
		}
		close(jobs)

		// Wait for all workers to complete
		wg.Wait()
		close(errChan)

		// Check for any errors
		for err := range errChan {
			if err != nil {
				libs.Error(err.Error())
			}
		}

		DB.Exec("SET FOREIGN_KEY_CHECKS = 1")
		libs.Success("Migrated models")
	})
}

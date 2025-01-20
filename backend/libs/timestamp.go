package libs

import (
	"time"
)

func TimeElapsed(fn func()) {
	start := time.Now()
	fn()
	elapsed := time.Since(start)
	Info("Time Elapsed: " + elapsed.String())
}

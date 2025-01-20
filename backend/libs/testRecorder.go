package libs

import (
	"net/http/httptest"
)

// NewTestResponseRecorder creates a new HTTP response recorder for testing purposes.
func NewTestResponseRecorder() *httptest.ResponseRecorder {
	return httptest.NewRecorder()
}

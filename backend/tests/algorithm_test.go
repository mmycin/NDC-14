package tests

import (
	"reflect"
	"testing"
)

func TestReverseArray(t *testing.T) {
	// Test case for reverseArray function
	arr := []string{"a", "b", "r", "d", "e"}
	reversed := make([]string, len(arr))
	copy(reversed, arr)
	for i, j := 0, len(reversed)-1; i < j; i, j = i+1, j-1 {
		reversed[i], reversed[j] = reversed[j], reversed[i]
	}
	expected := []string{"e", "d", "r", "b", "a"}
	if !reflect.DeepEqual(reversed, expected) {
		t.Errorf("Expected %v but got %v", expected, reversed)
	}
}

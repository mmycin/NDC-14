package libs

import (
	"reflect"
	"regexp"

	goaway "github.com/TwiN/go-away"
)

// ReverseArray reverses any slice in place
func ReverseArray[T any](arr []T) {
	for i, j := 0, len(arr)-1; i < j; i, j = i+1, j-1 {
		arr[i], arr[j] = arr[j], arr[i]
	}
}

// censors all string fields in a struct or slice of structs
func Censor(data interface{}) {
	val := reflect.ValueOf(data)
	if val.Kind() == reflect.Ptr {
		val = val.Elem()
	}

	switch val.Kind() {
	case reflect.Slice:
		for i := 0; i < val.Len(); i++ {
			val := val.Index(i)
			for i := 0; i < val.NumField(); i++ {
				field := val.Field(i)
				if field.Kind() == reflect.String && field.CanSet() {
					str := field.String()
					censored := goaway.Censor(str)
					field.SetString(censored)
				}
			}
		}
	case reflect.Struct:
		for i := 0; i < val.NumField(); i++ {
			field := val.Field(i)
			if field.Kind() == reflect.String && field.CanSet() {
				str := field.String()
				censored := goaway.Censor(str)
				field.SetString(censored)
			}
		}
	}
}

func IsValidEmail(email string) bool {
	// RFC 5322 compliant email regex
	emailRegex := `^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$`
	match, _ := regexp.MatchString(emailRegex, email)
	return match
}

// IsValidRoll validates if a roll number follows the pattern: 1(2|3)\d14(001-150)
func IsValidRoll(roll string) bool {
	// Check basic length
	if len(roll) != 8 {
		return false
	}

	// Check if first digit is 1
	if roll[0] != '1' {
		return false
	}

	// Check if second digit is 2 or 3
	if roll[1] != '2' && roll[1] != '3' {
		return false
	}

	// Third digit can be any number (0-9), no need to check

	// Check if fourth and fifth digits are 14
	if roll[3:5] != "14" {
		return false
	}

	// Check if last three digits form a number between 001 and 150
	lastThree := roll[5:]
	num := 0
	for _, digit := range lastThree {
		num = num*10 + int(digit-'0')
	}

	return num >= 1 && num <= 150
}

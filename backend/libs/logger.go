package libs

import (
	"log"
)

func Success(message string) {
	var Reset = "\033[0m"
	var Green = "\033[32m"
	log.Printf("%s", Green+message+Reset)
}

func Error(message string) {
	var Reset = "\033[0m"
	var Red = "\033[31m"
	log.Printf("%s", Red+message+Reset)
}

func Info(message string) {
	var Reset = "\033[0m"
	var Blue = "\033[34m"
	log.Printf("%s", Blue+message+Reset)
}

func Warning(message string) {
	var Reset = "\033[0m"
	var Yellow = "\033[33m"
	log.Printf("%s", Yellow+message+Reset)
}

func Debug(message string) {
	var Reset = "\033[0m"
	var Magenta = "\033[35m"
	log.Printf("%s", Magenta+message+Reset)
}

func Fatal(message string) {
	var Reset = "\033[0m"
	var Red = "\033[31m"
	log.Fatalf("%s", Red+message+Reset)
}

func Panic(message string) {
	var Reset = "\033[0m"
	var Red = "\033[31m"
	log.Panicf("%s", Red+message+Reset)
}

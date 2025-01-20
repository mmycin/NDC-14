build:
	@go build -o bin/server cmd/main.go
	@echo Build completed successfully

run:
	@cls
	@go run cmd/main.go
	@pause
	@cls

watch:
	@cls
	@air cmd/main.go

update:
	@go get -u ./...

format:
	@go fmt ./...
	@echo Code formatted successfully

clean:
	@cls	
	@if exist bin rmdir /s /q bin
	@if exist bin/ rm -rf bin
	@echo Cleanup completed successfully

serve:
	@cls
	@echo Starting server...
	@go run cmd/main.go

commit:
	@if "$(filter-out commit,$(MAKECMDGOALS))" == "" ( \
		echo Please provide a commit message! && exit /b 1 \
	) else ( \
		git add . && git commit -m "$(filter-out commit,$(MAKECMDGOALS))" \
	)

%:
	@:

test:
	@cls
	@go test -v ./tests
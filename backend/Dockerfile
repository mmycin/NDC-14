# Build stage
FROM golang:1.23-alpine AS builder

# Set working directory
WORKDIR /app

# Copy go mod and sum files
COPY go.mod go.sum ./

# Download dependencies
RUN go mod download

# Copy the entire project
COPY . .

# Build the application (following Makefile build command)
RUN mkdir -p bin && \
    CGO_ENABLED=0 GOOS=linux go build -o bin/server cmd/main.go

# Final stage
FROM alpine:latest

# Add ca-certificates for HTTPS
RUN apk --no-cache add ca-certificates

WORKDIR /app

# Copy the binary from builder
COPY --from=builder /app/bin/server ./server

# Copy config files
COPY --from=builder /app/config ./config
COPY --from=builder /app/.env* ./

# Create necessary directories
RUN mkdir -p temp

# Set environment variables
ENV GO_ENV=production
ENV PORT=8080

# Expose the port
EXPOSE 8080

# Run the binary
CMD ["./server"]

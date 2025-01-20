#!/bin/bash

# Set image names
BACKEND_IMAGE="mmycin/ndc14-backend:latest"
FRONTEND_IMAGE="mmycin/ndc14-frontend:latest"

# Set Kubernetes configuration folder
K8S_CONFIG_DIR="./kubernetes"

# Build Docker images
echo "Building Backend Docker Image..."
docker build -t $BACKEND_IMAGE ./backend

echo "Building Frontend Docker Image..."
docker build -t $FRONTEND_IMAGE ./frontend

# Push Docker images to Docker Hub
echo "Pushing Backend Docker Image..."
docker push $BACKEND_IMAGE

echo "Pushing Frontend Docker Image..."
docker push $FRONTEND_IMAGE

# Apply Kubernetes configurations
echo "Deploying Backend to Kubernetes..."
kubectl apply -f $K8S_CONFIG_DIR/backend-deployment.yaml

echo "Deploying Frontend to Kubernetes..."
kubectl apply -f $K8S_CONFIG_DIR/frontend-deployment.yaml

echo "Deploying PostgreSQL to Kubernetes..."
kubectl apply -f $K8S_CONFIG_DIR/postgres-deployment.yaml

# If you're using an ingress, apply it
echo "Applying Ingress (if applicable)..."
kubectl apply -f $K8S_CONFIG_DIR/ingress.yaml

# Apply secrets for JWT and DB credentials
echo "Applying DB Secret..."
kubectl apply -f $K8S_CONFIG_DIR/db-secret.yaml

echo "Applying JWT Secret..."
kubectl apply -f $K8S_CONFIG_DIR/jwt-secret.yaml

# Final message
echo "Deployment completed successfully!"

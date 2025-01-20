# **Deployment Documentation for NDC14 App** 🚀

## Overview
Welcome to the deployment guide for the **NDC14 App**! This document will walk you through the process of building Docker images, deploying to Kubernetes, configuring Ingress, setting up the Ping-Checker, and automating everything with GitHub Actions. By the end, you’ll have everything running smoothly and automatically—just like magic! ✨

---

## **1. Docker Build and Push** 🔨

Before we jump into Kubernetes, we need to build and push Docker images for both the **NDC14 Backend** and **Frontend**.

### **Steps**:
1. **Build Docker images** (don’t worry, we won’t make you build them by hand):
```bash
docker build -t mmycin/ndc14-backend:latest ./backend
docker build -t mmycin/ndc14-frontend:latest ./frontend
```

2. **Push the images to your Docker registry** (like sending your app into the cloud to hang out with the cool kids):
```bash
docker push mmycin/ndc14-backend:latest
docker push mmycin/ndc14-frontend:latest
```

---

## **2. Kubernetes Deployment** 🐳

Time to take our Docker images and deploy them into the wild world of Kubernetes. Get ready for some serious app management.

### **Deployment YAMLs**:
- `backend-deployment.yaml`: The backend service deployment.
- `frontend-deployment.yaml`: The frontend service deployment.
- `postgres-deployment.yaml`: PostgreSQL database deployment (because every app needs a good database).
- `ingress.yaml`: Ingress configuration (your app’s VIP pass).
- `db-secret.yaml`: Super-secret database credentials.
- `jwt-secret.yaml`: Super-duper-secret JWT credentials.

### **Steps**:
1. Apply the Kubernetes deployment files (feel free to act like a Kubernetes wizard here):
```bash
kubectl apply -f backend-deployment.yaml
kubectl apply -f frontend-deployment.yaml
kubectl apply -f postgres-deployment.yaml
kubectl apply -f ingress.yaml   # If using ingress
kubectl apply -f db-secret.yaml
kubectl apply -f jwt-secret.yaml
```

2. **Ingress Tip**: If you're using Ingress, make sure your Ingress Controller is up and running (it’s the traffic cop for your Kubernetes services).

---

## **3. Configuring Ingress** 🌐

**Ingress** is like the traffic manager that ensures the right requests go to the right places. It’s basically the air traffic controller for your app. ✈️

### **Ingress YAML Example**:
```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: ndc14-ingress
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
spec:
  rules:
    - host: "ndc14.example.com"
      http:
        paths:
          - path: "/"
            pathType: Prefix
            backend:
              service:
                name: ndc14-frontend
                port:
                  number: 80
          - path: "/api"
            pathType: Prefix
            backend:
              service:
                name: ndc14-backend
                port:
                  number: 80
```

---

## **4. Ping-Checker Setup** 🔍

A **Ping-Checker** is like your app’s personal bodyguard, always making sure everything is running smoothly. 💪 It's like having a watchdog to alert you whenever anything goes wrong.

### **Steps**:
1. **Create a Ping-Checker script** to check the availability of your services:
    ```bash
    #!/bin/bash
    STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://ndc14.example.com)
    if [ $STATUS -eq 200 ]; then
      echo "The service is up and running! 🥳"
    else
      echo "Uh-oh, service is down. HTTP Code: $STATUS 😱"
    fi
    ```

    This script checks if your app is up by sending a request to your URL. If the status code is 200, everything is good. If not, it alerts you with the error code.

2. **Set up a Cron job** to run this Ping-Checker every 5 minutes:
    - Open the cron table for editing:
      ```bash
      crontab -e
      ```

    - Add the following line to the crontab file:
      ```bash
      */5 * * * * /path/to/ping-checker.sh >> /var/log/ping-checker.log 2>&1
      ```

      This line schedules the Ping-Checker to run every 5 minutes and logs the output into a file.

3. **Check Logs**: If something goes wrong, you’ll get an error message in your logs, and you can take action to resolve the issue before your users notice.

---

## **5. GitHub Actions for CI/CD** ⚙️

### **GitHub Actions Workflow for Cron Jobs**:
We use **GitHub Actions** to automate everything—because who wants to manually deploy and check everything? Not us! 🧑‍💻 With GitHub Actions, we can ensure that your app is always deployed automatically when you push new changes. It’s like having a magic deploy button in the cloud!

1. **Create a GitHub Actions Workflow** file `.github/workflows/deploy.yml`:

```yaml
name: Deploy NDC14 App

on:
  schedule:
    - cron: "0 * * * *"  # Runs every hour (you know, for the overachievers)
  push:
    branches:
      - main

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v2

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v1

      - name: Log in to DockerHub
        uses: docker/login-action@v2
        with:
          username: ${{ secrets.DOCKER_USERNAME }}
          password: ${{ secrets.DOCKER_PASSWORD }}

      - name: Build and push backend Docker image
        run: |
          docker build -t mmycin/ndc14-backend:latest ./backend
          docker push mmycin/ndc14-backend:latest

      - name: Build and push frontend Docker image
        run: |
          docker build -t mmycin/ndc14-frontend:latest ./frontend
          docker push mmycin/ndc14-frontend:latest

      - name: Apply Kubernetes deployment
        run: |
          kubectl apply -f kubernetes/ingress/ingress.yaml
          kubectl apply -f kubernetes/backend-deployment.yaml
          kubectl apply -f kubernetes/frontend-deployment.yaml
          kubectl apply -f kubernetes/postgres-deployment.yaml
          kubectl apply -f kubernetes/db-secret.yaml
          kubectl apply -f kubernetes/jwt-secret.yaml
```

2. **Cron Syntax**: The cron value in the workflow runs the job every hour. If you prefer it to run more often (or less), just change the cron expression. You’re the boss. 👑 

3. **Secret Management**: GitHub Actions requires your Docker credentials to be stored as secrets. Make sure to add your DOCKER_USERNAME and DOCKER_PASSWORD to your repository's secrets in GitHub.

---

## **6. Automating with `deploy.sh`** 🏃‍♂️

Why manually run all the steps when you can just use a **single script** to do everything? Enter **`deploy.sh`**—your new best friend. This script will save you from the repetitive tasks of building and deploying your app. It’s like your personal assistant for deployment. 👩‍💻

### **`deploy.sh`**:
```bash
#!/bin/bash

# Build and push Docker images
docker build -t mmycin/ndc14-backend:latest ./backend
docker build -t mmycin/ndc14-frontend:latest ./frontend

docker push mmycin/ndc14-backend:latest
docker push mmycin/ndc14-frontend:latest

# Apply Kubernetes deployments
kubectl apply -f kubernetes/ingress/ingress.yaml
kubectl apply -f kubernetes/backend-deployment.yaml
kubectl apply -f kubernetes/frontend-deployment.yaml
kubectl apply -f kubernetes/postgres-deployment.yaml
kubectl apply -f kubernetes/db-secret.yaml
kubectl apply -f kubernetes/jwt-secret.yaml

echo "Deployment complete! 🎉"
```


### How to Run the Script
1. Place deploy.sh in the root of your project.
2. Run it with this command:
```bash
./deploy.sh
```
---

## **This script will:**

- **Build and push the Docker images**: Automates the creation and pushing of the backend and frontend Docker images to your repository.
- **Deploy everything to Kubernetes**: Applies your Kubernetes configurations, including Ingress, deployments, secrets, and more.
  
You can run this script with a single command, and boom, you're done! 💥

---

## **7. Conclusion** 🎉

Congratulations, you’ve made it through the deployment process! You now have a **fully automated deployment pipeline** for the **NDC14 App**, from Docker builds to Kubernetes deployment, Ingress routing, and Ping-Checker monitoring. Plus, you’re armed with **GitHub Actions** to automate everything.

Now sit back, relax, and let automation do all the heavy lifting. You’ve earned it! 😎🎉

---

### **Next Steps:**

- Enjoy your beautifully deployed app on Kubernetes.
- Keep an eye on the **Ping-Checker logs** (but don’t stress, it’s doing all the work for you).
- If anything breaks, the **Ping-Checker** will let you know before your users even notice!

**Happy Deploying! 🚀**

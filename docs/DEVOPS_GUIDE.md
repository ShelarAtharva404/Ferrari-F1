# 🏎️ Ferrari F1 Website — Complete DevOps Deployment Guide

> This guide walks you through deploying the Ferrari F1 website to the cloud with full CI/CD, Kubernetes, and MongoDB Atlas — step by step.

---

## Table of Contents

1. [Local Development Setup](#1-local-development-setup)
2. [MongoDB Atlas Setup](#2-mongodb-atlas-setup)
3. [Docker — Build & Test Locally](#3-docker--build--test-locally)
4. [GitHub Setup & CI/CD Configuration](#4-github-setup--cicd-configuration)
5. [Cloud Deployment Options](#5-cloud-deployment-options)
   - A. AWS EKS
   - B. GCP GKE
   - C. Azure AKS
6. [Kubernetes Deployment](#6-kubernetes-deployment)
7. [Domain & SSL (HTTPS)](#7-domain--ssl-https)
8. [Monitoring & Logging](#8-monitoring--logging)
9. [Post-Deployment Verification](#9-post-deployment-verification)

---

## 1. Local Development Setup

### Prerequisites
| Tool | Version | Install |
|------|---------|---------|
| Node.js | ≥ 18 | https://nodejs.org |
| npm | ≥ 9 | Bundled with Node.js |
| Git | latest | https://git-scm.com |
| Docker Desktop | latest | https://docker.com |
| kubectl | latest | https://kubernetes.io/docs/tasks/tools/ |

### Steps

```bash
# 1. Clone the project
git clone <your-repo-url> ferrari-f1
cd ferrari-f1

# 2. Install frontend dependencies
cd frontend
npm install
cd ..

# 3. Install backend dependencies
cd backend
npm install

# 4. Configure backend environment
cp .env.example .env
# Edit .env and fill in your MONGODB_URI

# 5. Start backend
npm run dev   # runs on http://localhost:5000

# 6. Start frontend (new terminal)
cd ../frontend
npm run dev   # runs on http://localhost:3000
```

---

## 2. MongoDB Atlas Setup

### 2.1 Create Free Cluster
1. Go to https://cloud.mongodb.com
2. Click **"Build a Database"** → Choose **M0 Free Tier**
3. Select your cloud provider (AWS/GCP/Azure) and region
4. Set cluster name: `ferrari-f1-cluster`
5. Click **Create**

### 2.2 Configure Access
1. **Database Access** → Add user:
   - Username: `ferrari-admin`
   - Password: Generate a strong password (save it!)
   - Role: `Atlas Admin`

2. **Network Access** → Add IP:
   - For development: Add your IP address
   - For production: Add `0.0.0.0/0` (or your cloud's NAT IP range)

### 2.3 Get Connection String
1. Click **Connect** → **Drivers**
2. Select Node.js / version 4.1 or later
3. Copy the URI, replace `<password>` with your actual password:

```
mongodb+srv://ferrari-admin:<password>@ferrari-f1-cluster.xxxxx.mongodb.net/ferrari-f1?retryWrites=true&w=majority
```

4. Paste this as `MONGODB_URI` in your backend `.env`

### 2.4 Seed the Database
```bash
cd backend
cp .env.example .env
# Edit .env with your MONGODB_URI
npm run seed
```

---

## 3. Docker — Build & Test Locally

### Build Images

```bash
# From root directory
docker compose build

# Or build individually
docker build -t ferrari-frontend ./frontend
docker build -t ferrari-backend ./backend
```

### Run with Docker Compose

```bash
# Set MONGODB_URI in shell or .env file at root
export MONGODB_URI="mongodb+srv://..."

docker compose up -d

# Check status
docker compose ps
docker compose logs -f

# Stop
docker compose down
```

Open http://localhost:3000 to see the site.

### Test API
```bash
curl http://localhost:5000/health
curl http://localhost:5000/api/drivers
curl http://localhost:5000/api/standings
```

---

## 4. GitHub Setup & CI/CD Configuration

### 4.1 Push to GitHub
```bash
cd ferrari-f1
git init
git add .
git commit -m "feat: Initial Ferrari F1 website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/ferrari-f1.git
git push -u origin main
```

### 4.2 GitHub Secrets Required

Go to **GitHub → Repo → Settings → Secrets and variables → Actions → New repository secret**:

| Secret Name | Value |
|------------|-------|
| `KUBECONFIG` | Base64-encoded kubeconfig: `cat kubeconfig.yaml \| base64` |

The `GITHUB_TOKEN` is automatically provided by GitHub — no setup needed for pushing to GHCR.

### 4.3 How the Pipeline Works

```
Push to main branch
       ↓
test-frontend (npm ci + build)
       +
test-backend (npm ci)
       ↓
build-and-push (Docker images → GHCR)
       ↓
deploy (kubectl apply → Kubernetes)
```

---

## 5. Cloud Deployment Options

### Option A: AWS EKS

#### Prerequisites
```bash
# Install AWS CLI
choco install awscli   # Windows
# or: winget install Amazon.AWSCLI

# Install eksctl
choco install eksctl
```

#### Create EKS Cluster
```bash
# Configure AWS
aws configure
# Enter: Access Key ID, Secret Key, Region (e.g. us-east-1), Format: json

# Create EKS cluster (takes ~15 min)
eksctl create cluster \
  --name ferrari-f1-cluster \
  --region us-east-1 \
  --nodegroup-name standard-workers \
  --node-type t3.medium \
  --nodes 2 \
  --nodes-min 2 \
  --nodes-max 4 \
  --managed

# Update kubeconfig
aws eks update-kubeconfig --region us-east-1 --name ferrari-f1-cluster

# Verify
kubectl get nodes
```

---

### Option B: Google GKE

#### Prerequisites
```bash
# Install gcloud CLI: https://cloud.google.com/sdk/docs/install
gcloud init
gcloud config set project YOUR_PROJECT_ID

# Enable APIs
gcloud services enable container.googleapis.com
```

#### Create GKE Cluster
```bash
gcloud container clusters create ferrari-f1-cluster \
  --zone us-central1-a \
  --num-nodes 2 \
  --machine-type e2-medium \
  --enable-autoscaling --min-nodes 2 --max-nodes 4

# Get credentials
gcloud container clusters get-credentials ferrari-f1-cluster --zone us-central1-a

kubectl get nodes
```

---

### Option C: Azure AKS

#### Prerequisites
```bash
# Install Azure CLI: https://docs.microsoft.com/cli/azure/install-azure-cli
az login
```

#### Create AKS Cluster
```bash
# Create resource group
az group create --name ferrari-f1-rg --location eastus

# Create AKS cluster
az aks create \
  --resource-group ferrari-f1-rg \
  --name ferrari-f1-cluster \
  --node-count 2 \
  --node-vm-size Standard_DS2_v2 \
  --enable-cluster-autoscaler \
  --min-count 2 --max-count 4 \
  --generate-ssh-keys

# Get credentials
az aks get-credentials --resource-group ferrari-f1-rg --name ferrari-f1-cluster

kubectl get nodes
```

---

## 6. Kubernetes Deployment

### 6.1 Install Nginx Ingress Controller

```bash
# Install Nginx Ingress
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.9.4/deploy/static/provider/cloud/deploy.yaml

# Wait for it to be ready
kubectl wait --namespace ingress-nginx \
  --for=condition=ready pod \
  --selector=app.kubernetes.io/component=controller \
  --timeout=120s
```

### 6.2 Install cert-manager (for SSL)

```bash
kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.13.0/cert-manager.yaml

# Create Let's Encrypt ClusterIssuer
cat <<EOF | kubectl apply -f -
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: letsencrypt-prod
spec:
  acme:
    server: https://acme-v02.api.letsencrypt.org/directory
    email: your-email@domain.com
    privateKeySecretRef:
      name: letsencrypt-prod
    solvers:
    - http01:
        ingress:
          class: nginx
EOF
```

### 6.3 Create Namespace and Secrets

```bash
# Create namespace
kubectl create namespace ferrari-f1

# Create MongoDB URI secret
kubectl create secret generic ferrari-secrets \
  --from-literal=mongodb-uri="mongodb+srv://ferrari-admin:<password>@ferrari-f1-cluster.xxxx.mongodb.net/ferrari-f1?retryWrites=true&w=majority" \
  -n ferrari-f1
```

### 6.4 Update Image Registry in Manifests

Edit `k8s/frontend-deployment.yaml` and `k8s/backend-deployment.yaml`:

Replace:
```yaml
image: YOUR_REGISTRY/ferrari-frontend:latest
```

With your actual image (e.g. GitHub Container Registry):
```yaml
image: ghcr.io/YOUR_GITHUB_USERNAME/ferrari-f1/ferrari-frontend:latest
```

### 6.5 Update Domain in Ingress

Edit `k8s/ingress.yaml`, replace `ferrari-f1.yourdomain.com` with your actual domain.

### 6.6 Apply All Manifests

```bash
kubectl apply -f k8s/ingress.yaml
kubectl apply -f k8s/frontend-deployment.yaml
kubectl apply -f k8s/backend-deployment.yaml

# Check status
kubectl get all -n ferrari-f1
kubectl get ingress -n ferrari-f1
```

### 6.7 Get Load Balancer IP

```bash
kubectl get service -n ingress-nginx ingress-nginx-controller
# Note the EXTERNAL-IP — point your domain's DNS A record to this IP
```

---

## 7. Domain & SSL (HTTPS)

### 7.1 Point Your Domain DNS

In your domain registrar (GoDaddy, Namecheap, Cloudflare, etc.):
- Create an **A Record**: `ferrari-f1.yourdomain.com` → `<EXTERNAL-IP from above>`
- Wait 5-30 minutes for DNS propagation

### 7.2 Verify SSL Certificate
```bash
kubectl describe certificate ferrari-tls -n ferrari-f1
kubectl get certificaterequest -n ferrari-f1
```

Once issued, your site will be live at `https://ferrari-f1.yourdomain.com` 🏎️

---

## 8. Monitoring & Logging

### 8.1 Install Prometheus + Grafana

```bash
# Add Helm repos
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update

# Install Prometheus Stack (includes Grafana)
helm install monitoring prometheus-community/kube-prometheus-stack \
  --namespace monitoring \
  --create-namespace

# Access Grafana (port-forward)
kubectl port-forward svc/monitoring-grafana 3001:80 -n monitoring
# Default login: admin / prom-operator
```

### 8.2 View Logs

```bash
# View backend logs
kubectl logs -f deployment/ferrari-backend -n ferrari-f1

# View frontend logs
kubectl logs -f deployment/ferrari-frontend -n ferrari-f1

# View all pod events
kubectl get events -n ferrari-f1 --sort-by='.lastTimestamp'
```

---

## 9. Post-Deployment Verification

```bash
# 1. Check all pods running
kubectl get pods -n ferrari-f1

# 2. Test backend health
curl https://ferrari-f1.yourdomain.com/health

# 3. Test API endpoints
curl https://ferrari-f1.yourdomain.com/api/drivers
curl https://ferrari-f1.yourdomain.com/api/standings
curl https://ferrari-f1.yourdomain.com/api/calendar

# 4. Check resource usage
kubectl top pods -n ferrari-f1
kubectl top nodes

# 5. Verify ingress
kubectl describe ingress ferrari-ingress -n ferrari-f1
```

---

## Quick Reference

| Command | Purpose |
|---------|---------|
| `npm run dev` (frontend) | Start Vite dev server |
| `npm run dev` (backend) | Start Express with nodemon |
| `docker compose up -d` | Run full stack locally |
| `npm run seed` (backend) | Seed MongoDB with sample data |
| `kubectl get pods -n ferrari-f1` | Check pod status |
| `kubectl logs -f deployment/ferrari-backend -n ferrari-f1` | Stream backend logs |
| `kubectl rollout restart deployment/ferrari-backend -n ferrari-f1` | Rolling restart |

---

## Environment Variables Summary

### Backend `.env`
```env
PORT=5000
NODE_ENV=production
MONGODB_URI=mongodb+srv://<user>:<pass>@<cluster>.mongodb.net/ferrari-f1?retryWrites=true&w=majority
FRONTEND_URL=https://ferrari-f1.yourdomain.com
```

### GitHub Secrets
```
KUBECONFIG  = base64 encoded kubeconfig YAML
```

---

*Built with ❤️ and Ferrari red — Forza Ferrari! 🐎*

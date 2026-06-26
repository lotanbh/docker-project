# 🚀 Users Management System

A production-ready Enterprise User Management API built with **Node.js**, **Express.js**, and **MongoDB**. The project is fully containerized using **Docker** and features a modern DevOps pipeline with automated CI/CD **GitHub Actions workflows**.

---

## 🛠️ Tech Stack & Architecture

- **Backend:** Node.js, Express.js (RESTful API Design, Clean MVC Architecture)
- **Database:** MongoDB (Data Persistence, Schema Validation)
- **Containerization:** Docker & Docker Compose (Consistent Environment Isolation)
- **DevOps / CI/CD:** GitHub Actions (Automated Workflow pipelines)

---

## 📂 Project Directory Structure

```text
users-management/
├── .github/workflows/
│   └── docker.yml            # Automated CI/CD workflow pipeline
├── config/                   # Database & Environment configurations
├── controllers/              # Request handlers & Business logic
├── model/                    # MongoDB Schemas & Data models
├── routes/                   # REST API Endpoints routing
├── public/                   # Static assets
├── .dockerignore             # Optimizes Docker build contexts
├── .env                      # Environment variable configurations
├── .gitignore                # Version control exclusions
├── app.js                    # Application entry point
├── docker-compose.yml        # Multi-container orchestration configurations
├── Dockerfile                # Multi-stage Docker image recipe
├── load-users.js             # Data seeding script
├── package.json              # Project dependencies and metadata
└── requests.http             # HTTP client workspace for API testing
```

---

## 🚀 Getting Started

### Prerequisites
Make sure you have [Docker](https://docker.com) installed on your machine.

### Local Development (With Docker Compose)
The easiest way to spin up the application along with the MongoDB database is using Docker Compose.

1. **Clone the repository:**
   ```bash
   git clone https://github.com
   cd users-management
   ```

2. **Configure Environment Variables:**
   Create a `.env` file in the root directory based on your requirements (see Configuration section).

3. **Launch the Infrastructure:**
   Run the following command to build the images and launch the containers:
   ```bash
   docker compose up --build
   ```
   The API will be available locally at `http://localhost:8080` (or your configured port).

---

## ⚙️ Configuration (.env)

The application requires the following environment variables to run successfully:
```ini
PORT=3000
MONGO_URI=mongodb://mongodb:27017/users_db
NODE_ENV=development
```

---

## 🔄 DevOps & CI/CD Pipeline

This project implements professional software development practices using **GitHub Actions**:
- **Automated Workflows:** Triggered on every `push` or `pull_request` to the main branch.
- **Docker Integration (`docker.yml`):** Automatically validates the Dockerfile, builds the container image, and ensures build stability before deployment.

---

## 🧪 Testing the API

You can easily test the API endpoints using the included `requests.http` file via the **REST Client** extension in VS Code. It provides pre-configured requests for creating, reading, updating, and deleting users.

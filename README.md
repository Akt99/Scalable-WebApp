# Scalable Web App (Auth + Dashboard + Tasks CRUD)

Full-stack app with:
- React + Tailwind frontend
- Node.js/Express backend
- MongoDB database
- JWT authentication and protected dashboard routes

## Project Structure

- `/frontend`: React app (Vite + Tailwind)
- `/backend`: Express API + MongoDB models
- `/docs/postman_collection.json`: API collection

## Features

### Frontend
- Responsive UI with Tailwind CSS
- Register/Login forms with client-side validation
- Protected routes (`/dashboard` requires auth)
- Dashboard with:
  - Profile view/update
  - Task create/read/update/delete
  - Search and status filtering
  - Logout

### Backend
- JWT-based auth (`/api/auth/register`, `/api/auth/login`)
- Profile APIs (`GET /api/users/me`, `PATCH /api/users/me`)
- Task CRUD APIs (`/api/tasks`)
- Validation with `express-validator`
- Password hashing with `bcryptjs`
- Centralized error handling and auth middleware

## Setup Instructions

## 1. Start MongoDB

Using Docker:

```bash
docker compose up -d
```

Or run MongoDB locally and update `backend/.env`.

## 2. Run Backend

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

Backend runs at `http://localhost:5000`.

## 3. Run Frontend

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

Frontend runs at `http://localhost:5173`.

## Run Website With Docker (Recommended Quick Start)

Use this when you want the website running via Docker with production-like setup.

### 1. Prepare production env

```bash
cd /Users/arnabkumartripathy/Desktop/MERN/PROJECTS/scalablewebapp/backend
cp .env.production.example .env.production
```

Edit `/Users/arnabkumartripathy/Desktop/MERN/PROJECTS/scalablewebapp/backend/.env.production` and set:
- `MONGO_URI` (Atlas connection string)
- `JWT_SECRET`
- `CORS_ORIGIN=http://localhost`

### 2. Build and run containers

```bash
cd /Users/arnabkumartripathy/Desktop/MERN/PROJECTS/scalablewebapp
docker compose -f docker-compose.prod.yml up --build -d
```

### 3. Verify containers are running

```bash
docker compose -f docker-compose.prod.yml ps
```

### 4. Open the website

- Frontend: `http://localhost`
- API health: `http://localhost/health`

### 5. View logs and stop

```bash
docker compose -f docker-compose.prod.yml logs -f
docker compose -f docker-compose.prod.yml down
```

## Docker Deployment (Production)

This repo includes:
- `/Users/arnabkumartripathy/Desktop/MERN/PROJECTS/scalablewebapp/backend/Dockerfile`
- `/Users/arnabkumartripathy/Desktop/MERN/PROJECTS/scalablewebapp/frontend/Dockerfile`
- `/Users/arnabkumartripathy/Desktop/MERN/PROJECTS/scalablewebapp/frontend/nginx/default.conf`
- `/Users/arnabkumartripathy/Desktop/MERN/PROJECTS/scalablewebapp/docker-compose.prod.yml`

### 1. Prepare backend production env

```bash
cd /Users/arnabkumartripathy/Desktop/MERN/PROJECTS/scalablewebapp/backend
cp .env.production.example .env.production
```

Update `/Users/arnabkumartripathy/Desktop/MERN/PROJECTS/scalablewebapp/backend/.env.production` with your real values (`MONGO_URI`, `JWT_SECRET`, `CORS_ORIGIN`, etc.).

### 2. Local production test

```bash
cd /Users/arnabkumartripathy/Desktop/MERN/PROJECTS/scalablewebapp
docker compose -f docker-compose.prod.yml up --build -d
docker compose -f docker-compose.prod.yml ps
```

App URL:
- `http://localhost`

Stop containers:

```bash
docker compose -f docker-compose.prod.yml down
```

### 3. Push images to Docker Hub

```bash
docker login
docker tag scalablewebapp-backend <your-dockerhub-username>/scalablewebapp-backend:latest
docker tag scalablewebapp-frontend <your-dockerhub-username>/scalablewebapp-frontend:latest
docker push <your-dockerhub-username>/scalablewebapp-backend:latest
docker push <your-dockerhub-username>/scalablewebapp-frontend:latest
```

### 4. Deploy on Ubuntu VPS

Install Docker + Compose on server, then copy:
- `docker-compose.server.yml`
- `backend/.env.production`
- Update image names in `docker-compose.server.yml`

```bash
docker compose -f docker-compose.server.yml pull
docker compose -f docker-compose.server.yml up -d
docker compose -f docker-compose.server.yml ps
```

## API Notes

- Health check: `GET /health`
- Default auth header:
  - `Authorization: Bearer <token>`
- Common response shape:
  - Success: `{ success: true, message, data }`
  - Error: `{ success: false, message, details }`

Import `/docs/postman_collection.json` into Postman to test APIs quickly.

## Security Practices Implemented

- Password hashing with `bcryptjs` (salt rounds: 12)
- JWT signing and verification middleware
- Auth-gated profile/task endpoints
- Input validation on auth/profile/task payloads
- No password returned in profile responses

## Production Scalability Plan

- **Frontend scaling**
  - Move API calls into feature modules/hooks and add request caching (React Query/SWR).
  - Add route-level code splitting and bundle analysis.
  - Serve static assets via CDN with immutable caching.

- **Backend scaling**
  - Split into domain modules (`auth`, `users`, `tasks`) and add service interfaces for easier replacement.
  - Introduce Redis for rate limiting/session blacklisting and frequently-read caching.
  - Add queue workers (BullMQ/SQS) for async jobs (emails, exports, notifications).
  - Deploy horizontally behind load balancer; keep API stateless with JWT.
  - Add structured logs + APM/metrics (OpenTelemetry + Prometheus/Grafana).

- **Database scaling**
  - Add proper indexes and query profiling.
  - Use managed MongoDB with replica set and point-in-time backups.
  - Partition heavy collections by tenant/user shard strategy as load grows.

## Evaluation Checklist Coverage

- UI/UX responsiveness: Implemented in Tailwind with mobile-friendly layout.
- Frontend/backend integration: Axios calls to full auth/profile/task APIs.
- Security: Hashed passwords, token validation, protected routes, validation.
- Code quality/docs: Modular structure, centralized middleware, README + Postman docs.
- Scalability: Clear production plan and modular architecture.

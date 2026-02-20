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

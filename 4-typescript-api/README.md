🚀 my-typescript-api

A lightweight, production-ready RESTful API built with Node.js, TypeScript, and Express, designed with clean architecture and enhanced by built-in traceability for every request.


---

## 🚀 Features

- ✅ Built with **TypeScript** and **Express 5**
- ✅ Organized with clean architecture (routes, controllers, middlewares, services, models)
- ✅ Uses **MongoDB** with **Mongoose**
- ✅ Docker + Docker Compose support
- ✅ Environment-based `.env` file handling
- ✅ Strong security defaults with **Helmet**, **CORS**, and **Rate Limiting**
- ✅ 🔍 **Automatic traceability**: generates a unique `traceId` for every request and attaches it to logs and responses
- ✅ 📘 **Live Swagger documentation** using **TSOA** decorators – always in sync with your code

---

## 🛠️ Middlewares Used

| Middleware           | Purpose                                     |
| -------------------- | ------------------------------------------- |
| `cors`               | Enables Cross-Origin Resource Sharing       |
| `helmet`             | Sets secure HTTP headers                    |
| `express-rate-limit` | Rate-limiting for API protection            |
| `dotenv`             | Loads environment variables from `.env`     |
| `traceMiddleware`    | will add an unic id to trace all requests   |
| `errorHandler`       | will log all errors with the most detail possible  |
| `addTraceIdToResponse`| will add the X-Trace-Id header for traceability  |
| `zod`                | Request validation schema (with middleware) |

---
# Middlewares flow
```mermaid
graph TD
  A["Request"] --> B["trace.middleware.ts"]
  B --> C["response-header.middleware.ts"]
  C --> D["helmet"]
  D --> E["cors"]
  E --> F["rateLimit"]
  F --> G["express.json"]
  G --> H["express.urlencoded"]
  H --> I["/swagger + /swagger.json routes"]
  I --> J["errorHandler"]
  J --> K["Response"]

```

---

### 🔍 Description

- The `trace.middleware.ts` assigns a `traceId` to the request.
- `response-header.middleware.ts` attaches it to the response headers.
- Then you apply standard security and parsing middlewares (`helmet`, `cors`, `rateLimit`, `express.json()`, `express.urlencoded()`).
- After that, Swagger UI and the raw Swagger JSON route are registered.
- Finally, any uncaught errors flow into your global `errorHandler`.



---
## 📦 Requirements

- Docker installed
- Node.js (for local dev if needed)
- MongoDB instance (Docker or external)

---

## ⚙️ Environment Configuration

This project supports multiple `.env` files depending on how you run it:

| Mode             | File Used      | Description                                 |
| ---------------- | -------------- | ------------------------------------------- |
| Local Docker run | `.env.local`   | Use when running with `docker run` directly |
| Docker Compose   | `.env.compose` | Use when running with `docker-compose`      |

### Example: `.env.local`

```env
API_PORT=3000
MONGODB_CONNECTION=mongodb://root:example@host.docker.internal:27017/admin
```

---

🐳 Docker Setup

🔧 Build the image manually

```bash
docker build -t my-typescript-api:latest .
docker run --name my-typescript-api --env-file .env.local -p 3000:3000 my-typescript-api:latest
```

🔧 Use Docker Compose

```bash
docker-compose --env-file .env.compose up --build
```

📂 Project Structure

```bash
src/
├── app.ts               # Express app setup
├── routes/              # Route definitions
├── controllers/         # Request handlers
├── middlewares/         # Custom middlewares
├── config/              # MongoDB connection, env loader
├── types/               # Custom types
└── validations/         # Zod schemas
```

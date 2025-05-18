# 4-typescript-api

A lightweight, production-ready RESTful API built with **Node.js**, **TypeScript**, and **Express**, containerized with Docker and configured to run with or without Docker Compose.

---

## 🚀 Features

- ✅ Built with **TypeScript** and Express 5
- ✅ Organized with clean architecture (routes, controllers, middlewares)
- ✅ Uses **MongoDB** with **Mongoose**
- ✅ Docker + Docker Compose support
- ✅ Environment-based `.env` file handling
- ✅ Strong security and error handling

---

## 🛠️ Middlewares Used

| Middleware           | Purpose                                     |
| -------------------- | ------------------------------------------- |
| `cors`               | Enables Cross-Origin Resource Sharing       |
| `helmet`             | Sets secure HTTP headers                    |
| `express-rate-limit` | Rate-limiting for API protection            |
| `dotenv`             | Loads environment variables from `.env`     |
| `zod`                | Request validation schema (with middleware) |

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

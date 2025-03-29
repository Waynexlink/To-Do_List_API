# 📝 To-Do List API

A simple RESTful API for managing tasks, built with **Node.js, Express, MongoDB, and JWT authentication**.

## 🚀 Features

- **User Authentication** (Register/Login with JWT)
- **CRUD Operations for Tasks** (Create, Read, Update, Delete)
- **Task Filtering** (Pending, Completed)
- **Protected Routes** (Only authenticated users can access their tasks)
- **Deployed on Render**

## 🛠 Tech Stack

- Node.js
- Express.js
- MongoDB (Atlas)
- Mongoose
- JSON Web Token (JWT)

## 📌 API Endpoints

### 🔑 Auth Routes

| Method | Endpoint             | Description           |
| ------ | -------------------- | --------------------- |
| POST   | `/api/auth/register` | Register a new user   |
| POST   | `/api/auth/login`    | Login & get JWT token |

### ✅ Task Routes (Protected)

| Method | Endpoint         | Description                   |
| ------ | ---------------- | ----------------------------- |
| GET    | `/api/tasks`     | Get all tasks (User-specific) |
| POST   | `/api/tasks`     | Create a new task             |
| PATCH  | `/api/tasks/:id` | Update a task                 |
| DELETE | `/api/tasks/:id` | Delete a task                 |

## 🚀 Deployment

API is live at: **[My API Link](https://to-do-list-api-upsn.onrender.com)**

## 🛠 Setup & Installation

1. Clone the repo
   ```sh
   git clone https://github.com/waynexlink/todo-api.git
   cd todo-api
   ```
2. Install dependencies
   ```sh
   npm install
   ```
3. Create a `.env` file & add:
   ```
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   ```
4. Run the server
   ```sh
   npm start
   ```

## 🛠 Future Improvements

- Task due dates
- Task sharing
- Pagination

https://roadmap.sh/projects/todo-list-api

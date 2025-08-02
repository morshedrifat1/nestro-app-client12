# 🧠 Forum App — MERN Stack Project

A full-stack forum-style application where users can create posts, interact through comments, and vote on others’ content. Includes powerful admin dashboard features, membership system, and Firebase-based authentication and authorization.

---

> 🚀 **Live Demo:** [https://nestro-react-app.web.app](https://nestro-react-app.web.app)


## 🚀 Technologies Used

### Frontend
- **Vite**
- **React**
- **React Router**
- **Tailwind CSS**
- **TanStack Query (React Query)**
- **Axios**

### Backend
- **Node.js**
- **Express.js**
- **MongoDB**
- **Firebase Admin SDK (for Authorization)**

---

## 🔐 Authentication & Authorization

- ✅ **Authentication**: Handled via **Firebase Authentication**
  - 📧 Email & Password
  - 🔐 **Google Sign-In (OAuth)**
- 🔒 **Authorization**: Protected backend routes using **Firebase Admin SDK** with custom token verification middleware.
- 👥 Role-based access:
  - `User`
  - `Admin`

---

## 🌟 Features

### 🧑‍💻 User Features

- 🔐 **Login/Signup via Google or Email**
- 📝 **Post Creation**: 
  - Bronze users: Can create up to **5 posts**
  - Gold users: Can create **unlimited posts** after payment
- 🔼 **Upvote / Downvote** any post
- 💬 **Comment** on any post
- 🚩 **Report Comments** for review
- 📋 **Dashboard** to manage own posts and posts comments

### 👑 Membership System

- 🥉 **Bronze (default)**: Max 5 posts
- 🥇 **Gold**: Pay **$90** to unlock unlimited posting

### 🛠️ Admin Features

- 👥 **Manage User Roles** (Make Admin, Demote, etc.)
- ⚠️ **Review Reported Comments** (Delete if needed)
- 📊 **Site Statistics**:
  - Total Users
  - Total Posts
  - Total Comments

# 💼 Seller-Buyer Project Bidding and Management System

A full-stack web application that enables **buyers to post projects** and **sellers to place bids**. The system manages project assignments, deliverables, and feedback through a structured workflow.

---

## 🚀 Project Overview

This system was developed to streamline collaboration between clients (buyers) and freelancers (sellers). It supports the full project lifecycle:

1. User registration and login
2. Project posting (buyers)
3. Bidding on projects (sellers)
4. Selecting a seller (buyers)
5. Deliverable submission (sellers)
6. Feedback & review (buyers)

The application is built using a **Next.js frontend** and a **Node.js/Express backend**, connected via REST APIs, and integrated with **PostgreSQL** via **Prisma ORM**.

---

## 🧰 Tech Stack

### Frontend
- Next.js (App Router)
- Tailwind CSS
- Axios (API requests)

### Backend
- Node.js
- Express.js
- Prisma ORM
- PostgreSQL

### Other Tools
- Nodemailer (email notifications)
- Multer (file upload)
- Cloudinary (optional for media storage)
- JWT (authentication)
- Render (backend deployment)
- Vercel (frontend deployment)

---

## ✅ Features

- 👤 User Authentication (Register/Login with JWT)
- 📦 Buyer: Create Projects
- 📄 Seller: View & Bid on Projects
- 🎯 Buyer: Select Seller for Project
- 📁 Seller: Upload Deliverables
- 🌟 Buyer: Leave Review & Rating
- 📊 Dashboard views for both roles
- 🔐 Protected routes with role-based access
- 🌐 CORS-enabled secure API access

---

## 🧭 Project Workflow

| Step | Action                 | Actor        | API Route                            | Status Transition         |
|------|------------------------|--------------|--------------------------------------|---------------------------|
| 1    | Register/Login         | Buyer/Seller | `/api/auth/signup` & `/login`       | -                         |
| 2    | Create Project         | Buyer        | `POST /api/projects`                | -                         |
| 3    | Place Bid              | Seller       | `POST /api/bids`                    | -                         |
| 4    | Select Seller          | Buyer        | `POST /api/projects/select-seller` | PENDING → IN_PROGRESS     |
| 5    | Upload Deliverable     | Seller       | `POST /api/projects/complete`      | IN_PROGRESS → COMPLETED   |
| 6    | Leave Review (Optional)| Buyer        | `POST /api/review`                 | Final                     |

---

## 🛠️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/Bidding-and-Management-System.git
cd Bidding-and-Management-System
2. Setup Backend
bash
Copy
Edit
cd backend
npm install
Create a .env file inside backend/:

env
Copy
Edit
PORT=5000
DATABASE_URL=your_postgresql_database_url
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
Run Prisma and start the server:

bash
Copy
Edit
npx prisma migrate dev --name init
npx prisma generate
npm run dev
3. Setup Frontend
bash
Copy
Edit
cd ../frontend
npm install
Update your Axios instance in lib/api.ts:

ts
Copy
Edit
const axiosInstance = axios.create({
  baseURL: "https://your-backend-url.onrender.com/api",
  withCredentials: true,
});
4. Run Frontend
bash
Copy
Edit
npm run dev
🌐 Deployment
Backend (Render)
Connect your GitHub repo

Set Build Command:
npm install && npx prisma generate

Set Start Command:
npm run start

Add environment variables from .env

Frontend (Vercel)
Import GitHub frontend repo

Add this environment variable:
NEXT_PUBLIC_API_URL=https://your-backend.onrender.com/api


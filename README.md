Seller-Buyer Project Bidding and Management System
A full-stack web application that enables buyers to post projects and sellers to place bids. The system manages project assignments, deliverables, and feedback through a structured workflow.
________________________________________
🚀 Project Overview
This system was developed to streamline collaboration between clients (buyers) and freelancers (sellers). It supports the full project lifecycle:
1.	User registration and login
2.	Project posting (buyers)
3.	Bidding on projects (sellers)
4.	Selecting a seller (buyers)
5.	Deliverable submission (sellers)
6.	Feedback & review (buyers)
The application was built using a Next.js frontend and a Node.js/Express backend, connected via REST APIs, and integrated with PostgreSQL via Prisma ORM.
________________________________________
🧰 Tech Stack
Frontend
•	Next.js (App Router)
•	Tailwind CSS
•	Axios for API requests
Backend
•	Node.js
•	Express.js
•	Prisma ORM
•	PostgreSQL
Other Tools
•	Nodemailer (email notifications)
•	Multer (file upload)
•	Cloudinary (optional for media storage)
•	JWT (authentication)
•	Render (backend deployment)
•	Vercel (frontend deployment)
________________________________________
✅ Features
•	👤 User Authentication (Register/Login with JWT)
•	📦 Buyer: Create Projects
•	📄 Seller: View & Bid on Projects
•	🎯 Buyer: Select Seller for Project
•	📁 Seller: Upload Deliverables
•	🌟 Buyer: Leave Review & Rating
•	📊 Dashboard views for both roles
•	🔐 Protected routes with role-based access
•	🌐 CORS-enabled secure API access
________________________________________
🧭 Project Workflow
Step	Action	Actor	API Route	Status Transition
1	Register/Login	Buyer/Seller	/api/auth/signup & /login	-
2	Create Project	Buyer	POST /api/projects	-
3	Place Bid	Seller	POST /api/bids	-
4	Select Seller	Buyer	POST /api/projects/select-seller	PENDING → IN_PROGRESS
5	Upload Deliverable	Seller	POST /api/projects/complete	IN_PROGRESS → COMPLETED
6	Review + Rating (Opt)	Buyer	POST /api/review	Final
________________________________________
🛠️ Installation
1. Clone the repo
bash
CopyEdit
git clone https://github.com/your-username/Bidding-and-Management-System.git
cd Bidding-and-Management-System
2. Setup Backend
bash
CopyEdit
cd backend
npm install
Create a .env file in backend/:
env
CopyEdit
PORT=5000
DATABASE_URL=your_postgresql_database_url
JWT_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
Run Prisma & start server:
bash
CopyEdit
npx prisma migrate dev --name init
npx prisma generate
npm run dev
3. Setup Frontend
bash
CopyEdit
cd ../frontend
npm install
Configure frontend/lib/api.ts with backend URL:
ts
CopyEdit
const axiosInstance = axios.create({
  baseURL: "https://your-backend-url.onrender.com/api",
  withCredentials: true,
});
4. Run Frontend
bash
CopyEdit
npm run dev
________________________________________
🌐 Deployment
Backend (Render):
•	Deploy from GitHub repo
•	Set Build Command: npm install && npx prisma generate
•	Set Start Command: npm run start
•	Add Environment Variables
Frontend (Vercel):
•	Import GitHub repo
•	Set Environment Variable: NEXT_PUBLIC_API_URL=https://your-backend.onrender.com/api


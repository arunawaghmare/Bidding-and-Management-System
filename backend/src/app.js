import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import bidRoutes from "./routes/bidRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";

dotenv.config();

const app = express();

// ✅ CORS Setup: Allow frontend on Vercel
app.use(
  cors({
    origin: ["https://bidding-and-management-system.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// ✅ JSON Body Parser
app.use(express.json());

// ✅ Routes
app.use("/api/auth", authRoutes); // POST /api/auth/signup
app.use("/api/projects", projectRoutes); // CRUD /api/projects
app.use("/api/bids", bidRoutes); // POST /api/bids
app.use("/api", reviewRoutes); // POST /api/review

// ✅ Root Route
app.get("/", (req, res) => {
  res.send("Seller-Buyer Bidding System API is running.");
});

export default app;

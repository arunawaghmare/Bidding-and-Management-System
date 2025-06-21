import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import bidRoutes from "./routes/bidRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";

dotenv.config();

const app = express();

// ✅ CORS Setup: Allow Vercel frontend
app.use(
  cors({
    origin: "https://bidding-and-management-system-m45wflrbx.vercel.app",
    credentials: true,
  })
);

// ✅ JSON Body Parser
app.use(express.json());

// ✅ Routes
app.use("/api/auth", authRoutes); // POST /api/auth/signup
app.use("/api/projects", projectRoutes); // GET /api/projects
app.use("/api/bids", bidRoutes); // POST /api/bids
app.use("/api", reviewRoutes); // GET /api/reviews/me etc.

// ✅ Default fallback route (optional)
app.get("/", (req, res) => {
  res.send("Seller-Buyer Bidding System API is running.");
});

export default app;

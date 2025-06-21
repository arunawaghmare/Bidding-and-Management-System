import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import bidRoutes from "./routes/bidRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";

import dotenv from "dotenv";
dotenv.config();
app.use(
  cors({
    origin: "https://bidding-and-management-system-m45wflrbx.vercel.app", // your Vercel frontend domain
    credentials: true,
  })
);
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/bids", bidRoutes);
app.use("/api", reviewRoutes);
export default app;

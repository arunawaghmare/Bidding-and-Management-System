import express from "express";
import { submitReview } from "../controllers/reviewController.js";
const router = express.Router();

router.post("/projects/:projectId/review", submitReview);

export default router;

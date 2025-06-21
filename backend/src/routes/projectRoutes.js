// src/routes/projectRoutes.js
import express from "express";
import multer from "multer";

import {
  createProject,
  selectSeller,
  completeProject,
  getAllProjects,
} from "../controllers/projectController.js";
import auth from "../middelware/authMiddleware.js";
const router = express.Router();
const upload = multer({ dest: "uploads/" });
router.get("/", getAllProjects);

router.post("/", auth, createProject);
router.post("/select", auth, selectSeller);
router.post("/complete", auth, upload.single("file"), completeProject);

export default router;

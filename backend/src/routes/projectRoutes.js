// routes/projectRoutes.js
import express from "express";
import auth from "../middelware/authMiddleware.js";
import upload from "../middelware/upload.js";
import {
  createProject,
  selectSeller,
  completeProject,
  getAllProjects,
} from "../controllers/projectController.js";

const router = express.Router();

router.get("/", getAllProjects);
router.post("/", auth, createProject);
router.post("/select", auth, selectSeller);
router.post(
  "/projects/complete/:projectId",
  auth,
  upload.single("file"),
  completeProject
);

export default router;

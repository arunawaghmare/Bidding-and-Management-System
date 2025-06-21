// src/routes/bidRoutes.js
import express from "express";

import { placeBid, getBids } from "../controllers/bidController.js";
import auth from "../middelware/authMiddleware.js";
const router = express.Router();

router.post("/", auth, placeBid);
router.get("/:projectId", getBids);

export default router;

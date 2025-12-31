import express from "express";
import { getAllJobs, createJob } from "../controllers/jobController.js";

const router = express.Router();

// GET /api/jobs
router.get("/", getAllJobs);

// POST /api/jobs
router.post("/", createJob);

export default router;

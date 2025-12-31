import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import jobRoutes from "./routes/jobRoutes.js";
import recommendRoutes from "./routes/recommendRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/jobs", jobRoutes);
app.use("/api", recommendRoutes);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(error => console.error(error));

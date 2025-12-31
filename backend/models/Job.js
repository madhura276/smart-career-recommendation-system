import mongoose from "mongoose";

const JobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    skills: { type: [String], required: true },
    salaryRange: { type: String },
    description: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Job", JobSchema);

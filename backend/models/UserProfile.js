import mongoose from "mongoose";

const UserProfileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  education: String,
  skills: [String],
  interests: [String],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("UserProfile", UserProfileSchema);

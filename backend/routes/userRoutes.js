import express from "express";
import UserProfile from "../models/UserProfile.js";

const router = express.Router();

router.post("/user", async (req, res) => {
  try {
    const user = new UserProfile(req.body);
    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ message: "Error saving user profile" });
  }
});

export default router;

import Job from "../models/Job.js";
import getMLScore from "../utils/mlSimilarity.js";

export const recommendJobs = async (req, res) => {
  try {
    const { skills } = req.body;
    const jobs = await Job.find();
    const results = [];

    for (const job of jobs) {
      const jobSkills = job.skills.map(s => s.toLowerCase());
      const matchedSkills = jobSkills.filter(s => skills.includes(s));
      const missingSkills = jobSkills.filter(s => !skills.includes(s));

      const mlMatchScore = await getMLScore(skills, jobSkills);

      // Filter irrelevant jobs
      if (matchedSkills.length === 0 && mlMatchScore < 50) continue;

      const matchPercentage = Math.round(
        (matchedSkills.length / jobSkills.length) * 100
      );

      // 🤖 AI-style explanation (rule-based but human)
      let whyThisJob = `This role matches your skills in ${matchedSkills.join(", ") || "related technologies"}.`;

      if (missingSkills.length > 0) {
        whyThisJob += ` Learning ${missingSkills.slice(0, 2).join(", ")} can further improve your fit.`;
      }

      results.push({
        title: job.title,
        matchedSkills,
        missingSkills,
        matchPercentage,
        mlMatchScore,
        whyThisJob
      });
    }

    // Sort by ML score & return Top 5
    results.sort((a, b) => b.mlMatchScore - a.mlMatchScore);

    res.json(results.slice(0, 5));
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

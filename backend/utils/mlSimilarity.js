import { execFile } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getMLScore = (userSkills, jobSkills) => {
  return new Promise((resolve, reject) => {
    const scriptPath = path.join(__dirname, "../ml/ml_matcher.py");

    const payload = {
      user_skills: userSkills,
      job_skills: jobSkills
    };

    execFile(
      "python",
      [scriptPath, JSON.stringify(payload)],
      (error, stdout) => {
        if (error) {
          console.error("Python ML Error:", error);
          reject(error);
        } else {
          resolve(Number(stdout));
        }
      }
    );
  });
};

export default getMLScore;

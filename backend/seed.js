import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const JobSchema = new mongoose.Schema({
  title: String,
  skills: [String],
});

const Job = mongoose.model("Job", JobSchema);

const jobs = [
  { title: "Data Analyst", skills: ["Python", "SQL", "Power BI", "Excel", "Data Cleaning"] },
  { title: "Data Scientist", skills: ["Python", "Machine Learning", "Statistics", "Pandas", "NumPy"] },
  { title: "AI Engineer", skills: ["Deep Learning", "TensorFlow", "Python", "Neural Networks"] },
  { title: "Web Developer", skills: ["HTML", "CSS", "JavaScript", "React"] },
  { title: "Full Stack Developer", skills: ["Node.js", "React", "MongoDB", "Express", "JavaScript"] },
  { title: "Backend Developer", skills: ["Node.js", "Express", "MongoDB", "REST APIs"] },
  { title: "Frontend Developer", skills: ["React", "JavaScript", "Tailwind", "HTML", "CSS"] },
  { title: "Machine Learning Engineer", skills: ["Python", "ML", "Scikit-Learn", "Pandas"] },
  { title: "Business Analyst", skills: ["Excel", "SQL", "Power BI", "Communication"] },
  { title: "Cloud Engineer", skills: ["AWS", "Linux", "Docker", "Kubernetes"] },
  { title: "DevOps Engineer", skills: ["Docker", "Kubernetes", "CI/CD", "Linux"] },
  { title: "Software Engineer", skills: ["Java", "OOP", "DSA", "Spring Boot"] },
  { title: "Python Developer", skills: ["Python", "Flask", "APIs", "SQL"] },
  { title: "Mobile App Developer", skills: ["Flutter", "Dart", "Firebase"] },
  { title: "Cybersecurity Analyst", skills: ["Networking", "Linux", "Security Tools"] },
  { title: "Database Administrator", skills: ["SQL", "MySQL", "MongoDB", "Database Design"] },
  { title: "Game Developer", skills: ["Unity", "C#", "3D Modelling"] },
  { title: "UI/UX Designer", skills: ["Figma", "Wireframes", "Prototyping"] },
  { title: "Technical Writer", skills: ["Documentation", "Writing", "Research"] },
  { title: "QA Tester", skills: ["Manual Testing", "Automation", "Selenium"] },
];

async function seedDB() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("✔ MongoDB Connected");

    await Job.deleteMany();
    await Job.insertMany(jobs);

    console.log("🌟 Seed Data Inserted Successfully!");
  } catch (err) {
    console.error("❌ Error:", err);
  } finally {
    mongoose.connection.close();
  }
}

seedDB();

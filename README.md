# Smart Career Recommendation System (AI-Based)

## 📌 Overview
The Smart Career Recommendation System is an AI-based application that uses **Data Science and Machine Learning techniques** to recommend relevant job roles based on a user’s skills.  
The system ranks job roles using ML-based similarity, explains why a role fits the user, and identifies skill gaps to guide career improvement.

This project demonstrates **applied Data Science**, **Machine Learning reasoning**, and **end-to-end system design**.

---

## 🧠 Data Science & Machine Learning Approach
- User skills and job requirements are treated as **text-based features**
- **TF-IDF vectorization** converts skills into numerical representations
- **Cosine similarity** measures semantic similarity between user skills and job skills
- A **hybrid scoring strategy** combines:
  - Skill overlap
  - Semantic similarity
- Explainable AI logic is used to interpret and present model outputs clearly

---

## 🚀 Key Features
- ML-based job recommendation using semantic similarity
- Hybrid skill-matching and ranking logic
- Top-ranked job role recommendations
- Explainable AI insights (“Why this job fits you”)
- Skill-gap identification for upskilling guidance
- Clean and user-friendly React interface

---

## 🔄 How the System Works
1. User enters their skills
2. Backend retrieves job skill data from the database
3. Python-based ML logic computes similarity scores
4. Job roles are ranked based on relevance
5. Explainable insights and skill gaps are generated
6. Results are displayed with confidence indicators

---

## 🛠️ Tech Stack
**Programming Language**
- Python

**Data Science & Machine Learning**
- TF-IDF Vectorization
- Cosine Similarity
- Hybrid Scoring Logic
- Explainable AI (XAI concepts)

**Backend**
- Node.js
- Express.js
- MongoDB

**Frontend**
- React
- Tailwind CSS

---

## ▶️ How to Run the Project Locally

### Prerequisites
- Node.js (v16 or above)
- Python (v3.8 or above)
- MongoDB (local or MongoDB Atlas)
- npm

---

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/madhura276/smart-career-recommendation-system.git
cd smart-career-recommendation-system

**### 2️⃣ Backend Setup**
cd backend
npm install

**Create a .env file inside the backend folder:**
MONGO_URL=your_mongodb_connection_string
PORT=5000

**Install Python dependencies:**
pip install scikit-learn

**Start the backend server:**
node server.js

**Backend runs on:**
http://localhost:5000

3️⃣ Frontend Setup

**Open a new terminal:**
cd frontend
npm install
npm start

**Frontend runs on:**
http://localhost:3000

4️⃣ Using the Application

Enter your skills (e.g., python, sql, excel)
Click Get Recommendations
View ranked job roles with:
ML match score
Explainable AI insights
Skill-gap suggestions

🔮 Future Improvements

Skill importance weighting for better accuracy
Personalized learning path recommendations
Integration with real-world job descriptions
Enhanced data-driven insights and analytics

📌 Disclaimer

Recommendations are generated using ML-based similarity techniques and are intended to provide guidance, not definitive career decisions.

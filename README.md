# Smart Career Recommendation System

An AI-based career recommendation web application that suggests suitable job roles from a user's skills. The system compares user-entered skills with job requirements, calculates skill overlap, and uses a Python ML matcher with TF-IDF and cosine similarity to rank the best career matches.

## Features

- Enter comma-separated skills and get ranked job recommendations.
- Calculates exact matched skills and missing skills for each role.
- Uses a hybrid ML score based on skill overlap and semantic similarity.
- Displays confidence labels such as Strong Match, Moderate Match, and Low Match.
- Highlights the top recommendation.
- Provides short improvement suggestions for missing skills.
- Includes APIs to fetch and add jobs.

## Tech Stack

**Frontend**

- React
- Tailwind CSS
- React Scripts

**Backend**

- Node.js
- Express.js
- MongoDB
- Mongoose

**Machine Learning**

- Python
- scikit-learn
- TF-IDF Vectorizer
- Cosine Similarity

## Project Structure

```text
smart-career-recommendation/
|-- backend/
|   |-- controllers/
|   |   |-- jobController.js
|   |   `-- recommendController.js
|   |-- ml/
|   |   `-- ml_matcher.py
|   |-- models/
|   |   |-- Job.js
|   |   `-- UserProfile.js
|   |-- routes/
|   |   |-- jobRoutes.js
|   |   |-- recommendRoutes.js
|   |   `-- userRoutes.js
|   |-- utils/
|   |   `-- mlSimilarity.js
|   |-- seed.js
|   |-- server.js
|   `-- package.json
|-- frontend/
|   |-- src/
|   |   |-- components/
|   |   |   |-- Jobs.js
|   |   |   |-- Navbar.js
|   |   |   `-- RecommendJobs.js
|   |   |-- App.js
|   |   `-- index.js
|   `-- package.json
`-- README.md
```

## Prerequisites

Make sure you have the following installed:

- Node.js
- npm
- Python
- MongoDB

Python packages required by the ML matcher:

```bash
pip install scikit-learn
```

## Environment Variables

Create a `.env` file inside the `backend` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
MONGO_URL=your_mongodb_connection_string
```

`server.js` uses `MONGO_URI`, while `seed.js` uses `MONGO_URL`, so both are included for the current codebase.

## Installation

Clone the repository and install dependencies for both apps:

```bash
cd smart-career-recommendation

cd backend
npm install

cd ../frontend
npm install
```

## Seed Sample Jobs

The backend includes `seed.js` with sample career roles and skills.

```bash
cd backend
node seed.js
```

## Run the Application

Start the backend server:

```bash
cd backend
node server.js
```

The backend runs on:

```text
http://localhost:5000
```

Start the frontend:

```bash
cd frontend
npm start
```

The frontend runs on:

```text
http://localhost:3000
```

## How It Works

1. The user enters skills in the frontend, for example:

   ```text
   python, sql, excel
   ```

2. The frontend sends the skills to:

   ```text
   POST /api/recommend
   ```

3. The backend loads jobs from MongoDB and compares each job's required skills with the user's skills.

4. The backend calls the Python ML script through `child_process.execFile`.

5. The Python script calculates a final score using:

   ```text
   final_score = 60% exact skill overlap + 40% TF-IDF cosine similarity
   ```

6. The API returns the top 5 recommended roles sorted by ML match score.

## API Endpoints

### Get All Jobs

```http
GET /api/jobs
```

Returns all jobs stored in MongoDB.

### Add a Job

```http
POST /api/jobs
```

Example request body:

```json
{
  "title": "Data Analyst",
  "category": "Data",
  "skills": ["Python", "SQL", "Power BI", "Excel"],
  "salaryRange": "4 LPA - 8 LPA",
  "description": "Analyze business data and create dashboards."
}
```

### Get Career Recommendations

```http
POST /api/recommend
```

Example request body:

```json
{
  "skills": ["python", "sql", "excel"]
}
```

Example response:

```json
[
  {
    "title": "Data Analyst",
    "matchedSkills": ["python", "sql", "excel"],
    "missingSkills": ["power bi", "data cleaning"],
    "matchPercentage": 60,
    "mlMatchScore": 78.45,
    "whyThisJob": "This role matches your skills in python, sql, excel. Learning power bi, data cleaning can further improve your fit."
  }
]
```

## Notes

- The frontend currently renders the `RecommendJobs` component from `App.js`.
- The frontend expects the backend API to run on `http://localhost:5000`.
- The backend expects the Python command to be available as `python`.
- Keep skill input comma-separated for best results.

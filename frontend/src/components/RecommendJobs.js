import { useState } from "react";

const RecommendJobs = () => {
  const [skills, setSkills] = useState("");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getConfidenceLabel = (score) => {
    if (score >= 75) return { label: "Strong Match", color: "green" };
    if (score >= 55) return { label: "Moderate Match", color: "yellow" };
    return { label: "Low Match", color: "red" };
  };

  const handleRecommend = async () => {
    setError("");
    setJobs([]);

    if (!skills.trim()) {
      setError("Please enter at least one skill");
      return;
    }

    const skillsArray = skills
      .split(",")
      .map((s) => s.trim().toLowerCase());

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/recommend",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ skills: skillsArray }),
        }
      );

      const data = await response.json();
      setJobs(data);
    } catch {
      setError("Failed to fetch recommendations");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
        <h1 className="text-2xl font-bold text-center mb-4">
          Smart Career Recommendation (AI-Based)
        </h1>

        <input
          type="text"
          placeholder="Enter skills (python, sql, excel)"
          className="border p-2 w-full rounded mb-3"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
        />

        <button
          onClick={handleRecommend}
          disabled={loading}
          className="bg-blue-600 text-white py-2 rounded w-full"
        >
          {loading ? "Analyzing skill match..." : "Get Recommendations"}
        </button>

        {error && <p className="text-red-600 mt-3">{error}</p>}

        {jobs.length > 0 && (
          <div className="mt-6 space-y-4">
            {jobs.map((job, index) => {
              const confidence = getConfidenceLabel(job.mlMatchScore);

              return (
                <div
                  key={index}
                  className={`p-4 rounded border ${
                    index === 0
                      ? "bg-blue-50 border-blue-500"
                      : "bg-gray-50"
                  }`}
                >
                  {/* Job Title + Ranking */}
                  <h2 className="text-lg font-semibold flex items-center gap-2">
                    <span className="text-blue-600">#{index + 1}</span>
                    {job.title}

                    {index === 0 && (
                      <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded">
                        Top Recommendation
                      </span>
                    )}
                  </h2>

                  {index === 0 && (
                    <p className="text-xs text-gray-600 mt-1">
                      Highest-ranked role based on your current skills
                    </p>
                  )}

                  {/* ML Confidence Bar */}
                  <div className="w-full bg-gray-200 rounded h-2 my-2">
                    <div
                      className="bg-green-500 h-2 rounded"
                      style={{ width: `${job.mlMatchScore}%` }}
                    />
                  </div>

                  {/* ML Score + Interpretation */}
                  <p className="text-sm">
                    <b>ML Match Score:</b> {job.mlMatchScore}%
                    <span
                      className={`ml-2 text-xs px-2 py-1 rounded text-white ${
                        confidence.color === "green"
                          ? "bg-green-600"
                          : confidence.color === "yellow"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`}
                    >
                      {confidence.label}
                    </span>
                  </p>

                  <p className="text-xs text-gray-600 mt-1">
                    Model factors: skill overlap + semantic similarity
                  </p>

                  {/* Matched Skills */}
                  <p className="mt-2 text-sm">
                    <b>Matched Skills:</b>{" "}
                    {job.matchedSkills.length > 0
                      ? job.matchedSkills.join(", ")
                      : "Related skills"}
                  </p>

                  {/* Skill Improvement */}
                  {job.missingSkills.length > 0 && (
                    <p className="text-sm text-orange-600 mt-1">
                      📈 <b>Skills that improve your match:</b>{" "}
                      {job.missingSkills.join(", ")}
                    </p>
                  )}

                  {/* AI Insight */}
                  <div className="mt-3 p-3 bg-blue-50 border-l-4 border-blue-500 text-sm">
                    🤖 <b>Model Insight:</b> {job.whyThisJob}
                  </div>

                  {job.mlMatchScore < 50 && (
                    <p className="text-xs text-gray-500 mt-2">
                      This role is a partial match. Upskilling can significantly
                      improve suitability.
                    </p>
                  )}
                </div>
              );
            })}

            <p className="text-xs text-gray-500 mt-4 italic">
              Scores are generated using ML-based semantic similarity and skill
              overlap, and improve as more skills are added.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecommendJobs;

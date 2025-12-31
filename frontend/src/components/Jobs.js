// src/components/Jobs.js
import React, { useEffect, useState } from "react";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/jobs")
      .then((res) => res.json())
      .then((data) => setJobs(data))
      .catch((err) => console.error("Error fetching jobs:", err));
  }, []);

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold mb-5">Available Jobs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {jobs.length === 0 ? (
          <p>No jobs available</p>
        ) : (
          jobs.map((job) => (
            <div
              key={job._id}
              className="border p-4 rounded shadow hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold">{job.title}</h2>
              <p className="text-gray-600 mb-2">
                Skills: {job.skills.join(", ")}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Jobs;

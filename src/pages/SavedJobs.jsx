import { Link } from "react-router-dom";
import JobCard from "../components/JobCard";
import { useJobContext } from "../context/JobContext";

function SavedJobs() {
  const { savedJobs } = useJobContext();

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1>Saved Jobs</h1>
          <p>
            Keep track of jobs you want to apply for later.
          </p>
        </div>

        <span className="results-count">
          {savedJobs.length} Saved
        </span>
      </div>

      {savedJobs.length === 0 ? (
        <div className="empty-state">
          <h2>No Saved Jobs</h2>

          <p>
            You haven't saved any jobs yet.
          </p>

          <Link to="/jobs" className="primary-btn">
            Browse Jobs
          </Link>
        </div>
      ) : (
        <div className="jobs-grid">
          {savedJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default SavedJobs;
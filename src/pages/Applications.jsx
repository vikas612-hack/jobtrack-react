import { Link } from "react-router-dom";
import { useJobContext } from "../context/JobContext";

function Applications() {
  const { appliedJobs, updateStatus } = useJobContext();

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1>My Applications</h1>
          <p>Track and manage your job applications.</p>
        </div>

        <span className="results-count">
          {appliedJobs.length} Applications
        </span>
      </div>

      {appliedJobs.length === 0 ? (
        <div className="empty-state">
          <h2>No Applications Yet</h2>
          <p>
            You haven't applied for any jobs yet.
          </p>

          <Link to="/jobs" className="primary-btn">
            Explore Jobs
          </Link>
        </div>
      ) : (
        <div className="applications-list">
          {appliedJobs.map((job) => (
            <div className="application-card" key={job.id}>
              <div className="application-main">
                <div>
                  <h2>{job.title}</h2>
                  <p className="company">
                    {job.company}
                  </p>

                  <div className="job-info">
                    <span>📍 {job.location}</span>
                    <span>💰 {job.salary}</span>
                    <span>💼 {job.type}</span>
                  </div>
                </div>

                <span
                  className={`status-badge ${job.status
                    .toLowerCase()
                    .replace(" ", "-")}`}
                >
                  {job.status}
                </span>
              </div>

              <div className="application-footer">
                <label htmlFor={`status-${job.id}`}>
                  Update Status:
                </label>

                <select
                  id={`status-${job.id}`}
                  value={job.status}
                  onChange={(e) =>
                    updateStatus(job.id, e.target.value)
                  }
                >
                  <option value="Applied">Applied</option>
                  <option value="Shortlisted">
                    Shortlisted
                  </option>
                  <option value="Interview">
                    Interview
                  </option>
                  <option value="Rejected">Rejected</option>
                </select>

                <Link
                  to={`/jobs/${job.id}`}
                  className="details-btn"
                >
                  View Job
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Applications;
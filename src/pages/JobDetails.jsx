import { Link, useNavigate, useParams } from "react-router-dom";
import jobs from "../data/jobs";
import { useJobContext } from "../context/JobContext";

function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    applyJob,
    toggleSaveJob,
    isApplied,
    isSaved
  } = useJobContext();

  const job = jobs.find((item) => item.id === id);

  if (!job) {
    return (
      <div className="page-container">
        <div className="empty-state">
          <h2>Job Not Found</h2>
          <p>The job you are looking for does not exist.</p>

          <Link to="/jobs" className="primary-btn">
            Back to Jobs
          </Link>
        </div>
      </div>
    );
  }

  const applied = isApplied(job.id);
  const saved = isSaved(job.id);

  const handleApply = () => {
    if (!applied) {
      applyJob(job);
    }
  };

  const handleSave = () => {
    toggleSaveJob(job);
  };

  return (
    <div className="page-container">
      <button
        className="back-btn"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      <div className="job-details">
        <div className="job-details-header">
          <div>
            <h1>{job.title}</h1>
            <h3>{job.company}</h3>
          </div>

          <span className="job-type-badge">
            {job.type}
          </span>
        </div>

        <div className="job-details-info">
          <div>
            <strong>📍 Location</strong>
            <span>{job.location}</span>
          </div>

          <div>
            <strong>💰 Salary</strong>
            <span>{job.salary}</span>
          </div>

          <div>
            <strong>🎓 Experience</strong>
            <span>{job.experience}</span>
          </div>

          <div>
            <strong>📅 Posted</strong>
            <span>{job.postedAt}</span>
          </div>
        </div>

        <div className="job-details-section">
          <h2>Job Description</h2>
          <p>{job.description}</p>
        </div>

        <div className="job-details-section">
          <h2>Required Skills</h2>

          <div className="skills">
            {job.skills.map((skill) => (
              <span className="skill" key={skill}>
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="job-details-section">
          <h2>Requirements</h2>

          <ul className="requirements-list">
            {job.requirements.map((requirement, index) => (
              <li key={index}>{requirement}</li>
            ))}
          </ul>
        </div>

        <div className="job-details-actions">
          <button
            className={`apply-btn ${applied ? "applied" : ""}`}
            onClick={handleApply}
            disabled={applied}
          >
            {applied ? "Already Applied ✓" : "Apply Now"}
          </button>

          <button
            className={`save-btn large ${saved ? "saved" : ""}`}
            onClick={handleSave}
          >
            {saved ? "★ Saved" : "☆ Save Job"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default JobDetails;
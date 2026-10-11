import { Link } from "react-router-dom";
import { useJobContext } from "../context/JobContext";

function JobCard({ job }) {
  const {
    applyJob,
    toggleSaveJob,
    isApplied,
    isSaved
  } = useJobContext();

  const applied = isApplied(job.id);
  const saved = isSaved(job.id);

  const handleApply = () => {
    if (!applied) {
      applyJob(job);
    }
  };

  return (
    <div className="job-card">
      <div className="job-card-header">
        <div>
          <h3>{job.title}</h3>
          <p className="company">{job.company}</p>
        </div>

        <button
          className={`save-btn ${saved ? "saved" : ""}`}
          onClick={() => toggleSaveJob(job)}
        >
          {saved ? "★" : "☆"}
        </button>
      </div>

      <div className="job-info">
        <span>📍 {job.location}</span>
        <span>💰 {job.salary}</span>
        <span>💼 {job.type}</span>
        <span>🎓 {job.experience}</span>
      </div>

      <div className="skills">
        {job.skills.map((skill) => (
          <span className="skill" key={skill}>
            {skill}
          </span>
        ))}
      </div>

      <div className="job-card-actions">
        <Link to={`/jobs/${job.id}`} className="details-btn">
          View Details
        </Link>

        <button
          className={`apply-btn ${applied ? "applied" : ""}`}
          onClick={handleApply}
          disabled={applied}
        >
          {applied ? "Applied ✓" : "Apply"}
        </button>
      </div>
    </div>
  );
}

export default JobCard;
import { useMemo } from "react";
import { Link } from "react-router-dom";
import StatsCard from "../components/StatsCard";
import JobCard from "../components/JobCard";
import { useJobContext } from "../context/JobContext";
import jobs from "../data/jobs";

function Dashboard() {
  const { appliedJobs, savedJobs } = useJobContext();

  const statusCounts = useMemo(() => {
    return {
      applied: appliedJobs.filter(
        (job) => job.status === "Applied"
      ).length,

      shortlisted: appliedJobs.filter(
        (job) => job.status === "Shortlisted"
      ).length,

      interview: appliedJobs.filter(
        (job) => job.status === "Interview"
      ).length,

      rejected: appliedJobs.filter(
        (job) => job.status === "Rejected"
      ).length
    };
  }, [appliedJobs]);

  const recentJobs = useMemo(() => {
    return [...jobs]
      .sort(
        (a, b) =>
          new Date(b.postedAt) - new Date(a.postedAt)
      )
      .slice(0, 3);
  }, []);

  return (
    <div className="page-container">
      <section className="dashboard-header">
        <div>
          <h1>Welcome to JobTrack 👋</h1>
          <p>
            Track your job search and manage your applications
            in one place.
          </p>
        </div>

        <Link to="/jobs" className="primary-btn">
          Find Jobs
        </Link>
      </section>

      <section className="stats-grid">
        <StatsCard
          title="Available Jobs"
          value={jobs.length}
          icon="💼"
        />

        <StatsCard
          title="Applied Jobs"
          value={appliedJobs.length}
          icon="📄"
        />

        <StatsCard
          title="Saved Jobs"
          value={savedJobs.length}
          icon="⭐"
        />

        <StatsCard
          title="Interviews"
          value={statusCounts.interview}
          icon="🎯"
        />
      </section>

      <section className="dashboard-section">
        <div className="section-heading">
          <h2>Application Status</h2>
          <Link to="/applications">
            View Applications →
          </Link>
        </div>

        <div className="status-grid">
          <div className="status-card">
            <span>Applied</span>
            <strong>{statusCounts.applied}</strong>
          </div>

          <div className="status-card">
            <span>Shortlisted</span>
            <strong>{statusCounts.shortlisted}</strong>
          </div>

          <div className="status-card">
            <span>Interview</span>
            <strong>{statusCounts.interview}</strong>
          </div>

          <div className="status-card">
            <span>Rejected</span>
            <strong>{statusCounts.rejected}</strong>
          </div>
        </div>
      </section>

      <section className="dashboard-section">
        <div className="section-heading">
          <h2>Recently Added Jobs</h2>
          <Link to="/jobs">
            View All Jobs →
          </Link>
        </div>

        <div className="jobs-grid">
          {recentJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
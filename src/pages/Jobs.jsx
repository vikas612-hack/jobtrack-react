import { useMemo, useState } from "react";
import JobCard from "../components/JobCard";
import jobs from "../data/jobs";

function Jobs() {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("All");
  const [skill, setSkill] = useState("All");
  const [experience, setExperience] = useState("All");
  const [jobType, setJobType] = useState("All");
  const [sortBy, setSortBy] = useState("newest");

  const locations = [...new Set(jobs.map((job) => job.location))];
  const skills = [...new Set(jobs.flatMap((job) => job.skills))];
  const experiences = [...new Set(jobs.map((job) => job.experience))];
  const jobTypes = [...new Set(jobs.map((job) => job.type))];

  const filteredJobs = useMemo(() => {
    const result = jobs.filter((job) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        job.title.toLowerCase().includes(searchText) ||
        job.company.toLowerCase().includes(searchText);

      const matchesLocation =
        location === "All" || job.location === location;

      const matchesSkill =
        skill === "All" || job.skills.includes(skill);

      const matchesExperience =
        experience === "All" || job.experience === experience;

      const matchesJobType =
        jobType === "All" || job.type === jobType;

      return (
        matchesSearch &&
        matchesLocation &&
        matchesSkill &&
        matchesExperience &&
        matchesJobType
      );
    });

    if (sortBy === "salary") {
      result.sort((a, b) => b.salaryValue - a.salaryValue);
    } else {
      result.sort(
        (a, b) =>
          new Date(b.postedAt) - new Date(a.postedAt)
      );
    }

    return result;
  }, [search, location, skill, experience, jobType, sortBy]);

  const clearFilters = () => {
    setSearch("");
    setLocation("All");
    setSkill("All");
    setExperience("All");
    setJobType("All");
    setSortBy("newest");
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1>Find Your Next Job</h1>
          <p>Search and explore opportunities that match your skills.</p>
        </div>
      </div>

      <div className="filter-panel">
        <input
          type="text"
          placeholder="Search by job title or company..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        >
          <option value="All">All Locations</option>
          {locations.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <select
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
        >
          <option value="All">All Skills</option>
          {skills.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <select
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
        >
          <option value="All">All Experience</option>
          {experiences.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <select
          value={jobType}
          onChange={(e) => setJobType(e.target.value)}
        >
          <option value="All">All Job Types</option>
          {jobTypes.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="newest">Newest</option>
          <option value="salary">Highest Salary</option>
        </select>

        <button className="clear-btn" onClick={clearFilters}>
          Clear Filters
        </button>
      </div>

      <div className="results-header">
        <h2>Available Jobs</h2>
        <span>{filteredJobs.length} jobs found</span>
      </div>

      {filteredJobs.length > 0 ? (
        <div className="jobs-grid">
          {filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h3>No jobs found</h3>
          <p>
            Try changing your search or filter criteria.
          </p>

          <button
            className="clear-btn"
            onClick={clearFilters}
          >
            Reset Search
          </button>
        </div>
      )}
    </div>
  );
}

export default Jobs;
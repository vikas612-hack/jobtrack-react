
import { createContext, useContext, useEffect, useState } from "react";

const JobContext = createContext();

export const JobProvider = ({ children }) => {
  const [appliedJobs, setAppliedJobs] = useState(() => {
    return JSON.parse(localStorage.getItem("appliedJobs")) || [];
  });

  const [savedJobs, setSavedJobs] = useState(() => {
    return JSON.parse(localStorage.getItem("savedJobs")) || [];
  });

  // Save applied jobs whenever they change
  useEffect(() => {
    localStorage.setItem("appliedJobs", JSON.stringify(appliedJobs));
  }, [appliedJobs]);

  // Save bookmarked jobs whenever they change
  useEffect(() => {
    localStorage.setItem("savedJobs", JSON.stringify(savedJobs));
  }, [savedJobs]);

  // Apply for a job (prevent duplicate applications)
  const applyJob = (job) => {
    const alreadyApplied = appliedJobs.some(
      (item) => item.id === job.id
    );

    if (alreadyApplied) {
      return false;
    }

    setAppliedJobs((prev) => [
      ...prev,
      { ...job, status: "Applied" }
    ]);

    return true;
  };

  // Save or remove a bookmarked job
  const toggleSaveJob = (job) => {
    const isSaved = savedJobs.some(
      (item) => item.id === job.id
    );

    if (isSaved) {
      setSavedJobs((prev) =>
        prev.filter((item) => item.id !== job.id)
      );
    } else {
      setSavedJobs((prev) => [...prev, job]);
    }
  };

  // Update application status
  const updateStatus = (jobId, newStatus) => {
    setAppliedJobs((prev) =>
      prev.map((job) =>
        job.id === jobId
          ? { ...job, status: newStatus }
          : job
      )
    );
  };

  // Check if a job is already applied
  const isApplied = (jobId) =>
    appliedJobs.some((job) => job.id === jobId);

  // Check if a job is already saved
  const isSaved = (jobId) =>
    savedJobs.some((job) => job.id === jobId);

  return (
    <JobContext.Provider
      value={{
        appliedJobs,
        savedJobs,
        applyJob,
        toggleSaveJob,
        updateStatus,
        isApplied,
        isSaved
      }}
    >
      {children}
    </JobContext.Provider>
  );
};

// Custom hook to access job context
export const useJobContext = () => {
  return useContext(JobContext);
};
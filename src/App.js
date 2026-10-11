import { BrowserRouter, Routes, Route } from "react-router-dom";

import { JobProvider } from "./context/JobContext";

import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import Jobs from "./pages/Jobs";
import JobDetails from "./pages/JobDetails";
import Applications from "./pages/Applications";
import SavedJobs from "./pages/SavedJobs";

function App() {
  return (
    <BrowserRouter>
      <JobProvider>
        <Navbar />

        <main>
          <Routes>
            <Route path="/" element={<Dashboard />} />

            <Route path="/jobs" element={<Jobs />} />

            <Route
              path="/jobs/:id"
              element={<JobDetails />}
            />

            <Route
              path="/applications"
              element={<Applications />}
            />

            <Route
              path="/saved"
              element={<SavedJobs />}
            />
          </Routes>
        </main>
      </JobProvider>
    </BrowserRouter>
  );
}

export default App;
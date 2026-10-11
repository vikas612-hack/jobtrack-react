import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <NavLink to="/" className="logo">
          JobTrack
        </NavLink>

        <div className="nav-links">
          <NavLink to="/" end>
            Dashboard
          </NavLink>

          <NavLink to="/jobs">
            Jobs
          </NavLink>

          <NavLink to="/applications">
            Applications
          </NavLink>

          <NavLink to="/saved">
            Saved Jobs
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
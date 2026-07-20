import { Link, useNavigate } from "react-router-dom";
import backendApi from "../services/api";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
  try {
    await backendApi.post("/logout");

    alert("Logout successful");

    navigate("/login");
  } catch (error) {
    console.log(error);
  }
};

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        SmartSchool
      </div>

      <div className="navbar-links">
        <Link to="/dashboard">Dashboard</Link>

        <Link to="/students">Students</Link>

        <Link to="/attendance">Attendance</Link>

        <button onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
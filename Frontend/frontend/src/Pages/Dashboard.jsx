import { useEffect, useState } from "react";
import backendApi from "../services/api";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalAttendance: 0,
    presentCount: 0,
    absentCount: 0,
    attendancePercentage: "0%",
  });

  const fetchDashboardStats = async () => {
    try {
      const response = await backendApi.get("/dashboard");

      setStats(response.data);
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Welcome to SmartSchool Management System</p>
      </div>

      <div className="dashboard-cards">
        <div className="dashboard-card">
          <h3>Total Students</h3>
          <h2>{stats.totalStudents}</h2>
        </div>

        <div className="dashboard-card">
          <h3>Total Attendance</h3>
          <h2>{stats.totalAttendance}</h2>
        </div>

        <div className="dashboard-card">
          <h3>Present</h3>
          <h2>{stats.presentCount}</h2>
        </div>

        <div className="dashboard-card">
          <h3>Absent</h3>
          <h2>{stats.absentCount}</h2>
        </div>
      </div>

      <div className="attendance-summary">
        <h2>Overall Attendance</h2>

        <p>
          Attendance Percentage:{" "}
          <strong>
            {stats.attendancePercentage}
          </strong>
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
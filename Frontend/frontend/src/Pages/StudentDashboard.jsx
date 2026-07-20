const StudentDashboard = () => {
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  return (
    <div className="dashboard-container">
      <h1>Welcome, {user?.name}</h1>

      <p>
        This is your student dashboard.
      </p>

      <p>
        You can view your own academic information
        and attendance.
      </p>
    </div>
  );
};

export default StudentDashboard;
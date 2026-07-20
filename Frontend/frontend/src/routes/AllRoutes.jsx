import { Routes, Route } from "react-router-dom";

import Home from "../Pages/Home";
import Signup from "../Pages/Signup";
import Login from "../Pages/Login";
import Dashboard from "../Pages/Dashboard";
import Students from "../Pages/Students";
import Attendance from "../Pages/Attendance";
import StudentDashboard from "../Pages/StudentDashboard";
import ProtectedRoute from "../Components/ProtectedRouter";

function AllRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/signup" element={<Signup />} />

            <Route path="/login" element={<Login />} />

            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/student-dashboard"
                element={<StudentDashboard />}
            />

            <Route
                path="/students"
                element={
                    <ProtectedRoute>
                        <Students />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/attendance"
                element={
                    <ProtectedRoute>
                        <Attendance />
                    </ProtectedRoute>
                }
            />    </Routes>
    );
}

export default AllRoutes;
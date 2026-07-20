import Student from "../model/studentModel.js";
import Attendance from "../model/attendanceModel.js";

export const getDashboardStats = async (req, res) => {
    try {
        const totalStudents = await Student.countDocuments();

        const totalAttendance =
            await Attendance.countDocuments();

        const presentCount =
            await Attendance.countDocuments({
                status: "Present",
            });

        const absentCount =
            await Attendance.countDocuments({
                status: "Absent",
            });

        let attendancePercentage = 0;

        if (totalAttendance > 0) {
            attendancePercentage =
                (presentCount / totalAttendance) * 100;
        }

        res.status(200).json({
            totalStudents,
            totalAttendance,
            presentCount,
            absentCount,
            attendancePercentage:
                attendancePercentage.toFixed(2) + "%",
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};
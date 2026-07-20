import Attendance from "../model/attendanceModel.js";

export const markAttendance = async (req, res) => {
    try {
        const {
            studentId,
            date,
            status,
        } = req.body;

        const attendance = await Attendance.create({
            studentId,
            date,
            status,
        });

        res.status(201).json({
            message: "Attendance marked successfully",
            attendance,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export const getStudentAttendance = async (req, res) => {
    try {
        const { studentId } = req.params;

        const attendance = await Attendance.find({
            studentId,
        });

        const totalDays = attendance.length;

        const presentDays = attendance.filter(
            (record) => record.status === "Present"
        ).length;

        const attendancePercentage =
            totalDays === 0
                ? 0
                : (presentDays / totalDays) * 100;

        res.status(200).json({
            message: "Attendance fetched successfully",
            totalDays,
            presentDays,
            absentDays: totalDays - presentDays,
            attendancePercentage: `${attendancePercentage.toFixed(2)}%`,
            attendance,
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                message: "Attendance already marked for this student today",
            });
        }

        res.status(500).json({
            message: error.message,
        });
    }
}



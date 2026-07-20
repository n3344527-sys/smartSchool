import { useEffect, useState } from "react";
import backendApi from "../services/api";

const Attendance = () => {
    const [students, setStudents] = useState([]);
    const [attendance, setAttendance] = useState({});

    const [formData, setFormData] = useState({
        studentId: "",
        date: "",
        status: "Present",
    });

    // GET LOGGED-IN USER
    const user = JSON.parse(
        localStorage.getItem("user")
    );

    const isTeacher = user?.role === "teacher";

    // FETCH STUDENTS
    const fetchStudents = async () => {
        try {
            const response = await backendApi.get(
                "/students"
            );

            setStudents(response.data.students);
        } catch (error) {
            console.log(
                error.response?.data
            );
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    // HANDLE INPUT
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // MARK ATTENDANCE
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await backendApi.post(
                "/attendance",
                formData
            );

            alert(
                "Attendance marked successfully"
            );

            fetchAttendance(
                formData.studentId
            );

            setFormData({
                studentId: "",
                date: "",
                status: "Present",
            });
        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Something went wrong"
            );
        }
    };

    // GET ATTENDANCE
    const fetchAttendance = async (
        studentId
    ) => {
        if (!studentId) {
            setAttendance({});
            return;
        }

        try {
            const response =
                await backendApi.get(
                    `/attendance/student/${studentId}`
                );

            setAttendance(response.data);
        } catch (error) {
            console.log(
                error.response?.data
            );
        }
    };

    return (
        <div className="attendance-container">

            <h1>
                Attendance Management
            </h1>

            {/* ONLY TEACHER CAN MARK ATTENDANCE */}

            {isTeacher && (
                <>
                    <h2>
                        Mark Attendance
                    </h2>

                    <form
                        className="attendance-form"
                        onSubmit={
                            handleSubmit
                        }
                    >
                        <select
                            name="studentId"
                            value={
                                formData.studentId
                            }
                            onChange={(e) => {
                                handleChange(
                                    e
                                );

                                fetchAttendance(
                                    e.target.value
                                );
                            }}
                            required
                        >
                            <option value="">
                                Select Student
                            </option>

                            {students.map(
                                (student) => (
                                    <option
                                        key={
                                            student._id
                                        }
                                        value={
                                            student._id
                                        }
                                    >
                                        {
                                            student.name
                                        }
                                    </option>
                                )
                            )}
                        </select>

                        <input
                            type="date"
                            name="date"
                            value={
                                formData.date
                            }
                            onChange={
                                handleChange
                            }
                            required
                        />

                        <select
                            name="status"
                            value={
                                formData.status
                            }
                            onChange={
                                handleChange
                            }
                        >
                            <option value="Present">
                                Present
                            </option>

                            <option value="Absent">
                                Absent
                            </option>
                        </select>

                        <button type="submit">
                            Mark Attendance
                        </button>
                    </form>

                    <hr />
                </>
            )}

            {/* STUDENT CAN SELECT AND VIEW ATTENDANCE */}

            <h2>
                View Attendance
            </h2>

            <select
                onChange={(e) =>
                    fetchAttendance(
                        e.target.value
                    )
                }
            >
                <option value="">
                    Select Student
                </option>

                {students.map(
                    (student) => (
                        <option
                            key={
                                student._id
                            }
                            value={
                                student._id
                            }
                        >
                            {student.name}
                        </option>
                    )
                )}
            </select>

            {/* ATTENDANCE SUMMARY */}

            {attendance.totalDays !==
                undefined && (
                <div className="attendance-summary">

                    <h2>
                        Attendance Summary
                    </h2>

                    <p>
                        Total Days:{" "}
                        {
                            attendance.totalDays
                        }
                    </p>

                    <p>
                        Present Days:{" "}
                        {
                            attendance.presentDays
                        }
                    </p>

                    <p>
                        Absent Days:{" "}
                        {
                            attendance.absentDays
                        }
                    </p>

                    <p>
                        Attendance Percentage:{" "}
                        <strong>
                            {
                                attendance.attendancePercentage
                            }
                        </strong>
                    </p>

                </div>
            )}

            {/* ATTENDANCE HISTORY */}

            {attendance.attendance &&
                attendance.attendance.length >
                    0 && (

                <div className="attendance-history">

                    <h2>
                        Attendance History
                    </h2>

                    {attendance.attendance.map(
                        (record) => (

                            <div
                                className="attendance-record"
                                key={
                                    record._id
                                }
                            >

                                <p>
                                    Date:{" "}
                                    {new Date(
                                        record.date
                                    ).toLocaleDateString()}
                                </p>

                                <p>
                                    Status:{" "}
                                    <strong
                                        className={
                                            record.status ===
                                            "Present"
                                                ? "present-status"
                                                : "absent-status"
                                        }
                                    >
                                        {
                                            record.status
                                        }
                                    </strong>
                                </p>

                            </div>
                        )
                    )}

                </div>
            )}

        </div>
    );
};

export default Attendance;
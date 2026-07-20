import { useEffect, useState } from "react";
import backendApi from "../services/api";

const Students = () => {
    const [students, setStudents] = useState([]);
    const [search, setSearch] = useState("");

    const [formData, setFormData] = useState({
        userId: "",
        name: "",
        age: "",
        className: "",
        section: "",
        rollNumber: "",
    });

    const [editingStudent, setEditingStudent] = useState(null);

    // FETCH ALL STUDENTS
    const fetchStudents = async () => {
        try {
            const response = await backendApi.get("/students");

            setStudents(response.data.students);
        } catch (error) {
            console.log(error.response?.data);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    // HANDLE ADD STUDENT INPUT
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // ADD STUDENT
    const handleAddStudent = async (e) => {
        e.preventDefault();

        try {
            await backendApi.post("/students", formData);

            alert("Student added successfully");

            setFormData({
                userId: "",
                name: "",
                age: "",
                className: "",
                section: "",
                rollNumber: "",
            });

            fetchStudents();
        } catch (error) {
            console.log(error.response?.data);
        }
    };

    // SEARCH STUDENTS
    const filteredStudents = students.filter((student) =>
        student.name.toLowerCase().includes(search.toLowerCase())
    );

    // DELETE STUDENT
    const handleDelete = async (id) => {
        try {
            await backendApi.delete(`/students/${id}`);

            alert("Student deleted successfully");

            fetchStudents();
        } catch (error) {
            console.log(error.response?.data);
        }
    };

    // OPEN EDIT FORM
    const handleEdit = (student) => {
        setEditingStudent(student);
    };

    // UPDATE STUDENT
    const handleUpdateStudent = async (e) => {
        e.preventDefault();

        try {
            await backendApi.put(
                `/students/${editingStudent._id}`,
                editingStudent
            );

            alert("Student updated successfully");

            setEditingStudent(null);

            fetchStudents();
        } catch (error) {
            console.log(error.response?.data);
        }
    };
    const user = JSON.parse(
        localStorage.getItem("user")
    );

    const isTeacher = user?.role === "teacher";

return (
    <div className="students-container">

        <h1>Students Management</h1>

        {/* ADD STUDENT FORM - TEACHER ONLY */}

        {isTeacher && (
            <>
                <h2>Add Student</h2>

                <form
                    className="student-form"
                    onSubmit={handleAddStudent}
                >
                    <input
                        type="text"
                        name="userId"
                        placeholder="User ID"
                        value={formData.userId}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="text"
                        name="name"
                        placeholder="Student Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="number"
                        name="age"
                        placeholder="Age"
                        value={formData.age}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="text"
                        name="className"
                        placeholder="Class"
                        value={formData.className}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="text"
                        name="section"
                        placeholder="Section"
                        value={formData.section}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="text"
                        name="rollNumber"
                        placeholder="Roll Number"
                        value={formData.rollNumber}
                        onChange={handleChange}
                        required
                    />

                    <button type="submit">
                        Add Student
                    </button>
                </form>
            </>
        )}

        {/* EDIT STUDENT FORM - TEACHER ONLY */}

        {isTeacher && editingStudent && (
            <div className="student-form">

                <h2>Edit Student</h2>

                <form onSubmit={handleUpdateStudent}>

                    <input
                        type="text"
                        value={editingStudent.name}
                        onChange={(e) =>
                            setEditingStudent({
                                ...editingStudent,
                                name: e.target.value,
                            })
                        }
                    />

                    <input
                        type="number"
                        value={editingStudent.age}
                        onChange={(e) =>
                            setEditingStudent({
                                ...editingStudent,
                                age: e.target.value,
                            })
                        }
                    />

                    <input
                        type="text"
                        value={editingStudent.className}
                        onChange={(e) =>
                            setEditingStudent({
                                ...editingStudent,
                                className: e.target.value,
                            })
                        }
                    />

                    <input
                        type="text"
                        value={editingStudent.section}
                        onChange={(e) =>
                            setEditingStudent({
                                ...editingStudent,
                                section: e.target.value,
                            })
                        }
                    />

                    <input
                        type="text"
                        value={editingStudent.rollNumber}
                        onChange={(e) =>
                            setEditingStudent({
                                ...editingStudent,
                                rollNumber: e.target.value,
                            })
                        }
                    />

                    <button type="submit">
                        Update Student
                    </button>

                    <button
                        type="button"
                        onClick={() =>
                            setEditingStudent(null)
                        }
                    >
                        Cancel
                    </button>

                </form>
            </div>
        )}

        {/* SEARCH */}

        <input
            className="search-input"
            type="text"
            placeholder="Search student by name"
            value={search}
            onChange={(e) =>
                setSearch(e.target.value)
            }
        />

        {/* STUDENT LIST */}

        <div className="student-list-header">

            <h2>Student List</h2>

            <span>
                {filteredStudents.length} Students
            </span>

        </div>

        <div className="student-list">

            {filteredStudents.map((student) => (

                <div
                    className="student-card"
                    key={student._id}
                >

                    <div className="student-card-header">

                        <div className="student-avatar">
                            {student.name
                                .charAt(0)
                                .toUpperCase()}
                        </div>

                        <div>

                            <h3>
                                {student.name}
                            </h3>

                            <p className="student-id">
                                ID: {student._id}
                            </p>

                        </div>

                    </div>

                    <div className="student-details">

                        <div>
                            <span>Age</span>
                            <strong>
                                {student.age}
                            </strong>
                        </div>

                        <div>
                            <span>Class</span>
                            <strong>
                                {student.className}
                            </strong>
                        </div>

                        <div>
                            <span>Section</span>
                            <strong>
                                {student.section}
                            </strong>
                        </div>

                        <div>
                            <span>Roll Number</span>
                            <strong>
                                {student.rollNumber}
                            </strong>
                        </div>

                    </div>

                    {/* EDIT AND DELETE - TEACHER ONLY */}

                    {isTeacher && (
                        <div className="student-actions">

                            <button
                                className="edit-btn"
                                onClick={() =>
                                    handleEdit(student)
                                }
                            >
                                Edit
                            </button>

                            <button
                                className="delete-btn"
                                onClick={() =>
                                    handleDelete(
                                        student._id
                                    )
                                }
                            >
                                Delete
                            </button>

                        </div>
                    )}

                </div>

            ))}

        </div>

    </div>
);};

export default Students;
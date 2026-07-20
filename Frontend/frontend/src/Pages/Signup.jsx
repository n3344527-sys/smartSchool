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

  // GET LOGGED-IN USER
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const isTeacher = user?.role === "teacher";

  // FETCH ALL STUDENTS
  const fetchStudents = async () => {
    try {
      const response = await backendApi.get(
        "/students"
      );

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
      await backendApi.post(
        "/students",
        formData
      );

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

      alert(
        error.response?.data?.message ||
          "Failed to add student"
      );
    }
  };

  // SEARCH STUDENTS
  const filteredStudents = students.filter(
    (student) =>
      student.name
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  // DELETE STUDENT
  const handleDelete = async (id) => {
    try {
      await backendApi.delete(
        `/students/${id}`
      );

      alert("Student deleted successfully");

      fetchStudents();
    } catch (error) {
      console.log(error.response?.data);

      alert(
        error.response?.data?.message ||
          "Failed to delete student"
      );
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

      alert(
        error.response?.data?.message ||
          "Failed to update student"
      );
    }
  };

  return (
    <div className="students-container">
      <h1>Students</h1>

      {/* ADD STUDENT FORM */}
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

      <hr />

      {/* EDIT STUDENT FORM */}
      {isTeacher && editingStudent && (
        <div className="edit-student">
          <h2>Edit Student</h2>

          <form
            onSubmit={handleUpdateStudent}
          >
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

      <hr />

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search student by name"
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      {/* STUDENT LIST */}
      <h2>Student List</h2>

      {filteredStudents.map((student) => (
        <div
          className="student-card"
          key={student._id}
        >
          <h3>{student.name}</h3>

          <p>
            <strong>Age:</strong>{" "}
            {student.age}
          </p>

          <p>
            <strong>Class:</strong>{" "}
            {student.className}
          </p>

          <p>
            <strong>Section:</strong>{" "}
            {student.section}
          </p>

          <p>
            <strong>Roll Number:</strong>{" "}
            {student.rollNumber}
          </p>

          {/* ONLY TEACHER CAN EDIT AND DELETE */}
          {isTeacher && (
            <div>
              <button
                onClick={() =>
                  handleEdit(student)
                }
              >
                Edit
              </button>

              <button
                onClick={() =>
                  handleDelete(student._id)
                }
              >
                Delete
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Students;
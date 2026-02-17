import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../App.css";

function StudentList() {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 5;

  const username = localStorage.getItem("username") || "User";

  useEffect(() => {
    fetchStudents();
  }, []);

  useEffect(() => {
    // Filter students based on search term
    const filtered = students.filter((student) =>
      student.full_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredStudents(filtered);
    setCurrentPage(1); // Reset to first page when searching
  }, [searchTerm, students]);

  const fetchStudents = async () => {
    try {
      const response = await axios.get("http://localhost:5000/students");
      setStudents(response.data);
      setFilteredStudents(response.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch students");
      setLoading(false);
      toast.error("Failed to fetch students");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        await axios.delete(`http://localhost:5000/students/${id}`);
        setStudents(students.filter((student) => student.id !== id));
        toast.success("Student deleted successfully!");
      } catch (err) {
        toast.error("Failed to delete student");
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    toast.info("Logged out successfully");
    navigate("/");
  };

  // Pagination logic
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) return (
    <div className="container" style={{ textAlign: 'center', padding: '100px 0' }}>
      <div style={{
        width: '60px',
        height: '60px',
        border: '5px solid rgba(255, 255, 255, 0.3)',
        borderTop: '5px solid white',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        margin: '0 auto 20px'
      }}></div>
      <p style={{ color: 'white', fontSize: '18px', fontWeight: '600' }}>Loading students...</p>
      <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); }}`}</style>
    </div>
  );
  if (error) return <div className="container error">{error}</div>;

  return (
    <div className="container">
      <div className="header">
        <h1>Student Management System</h1>
        <div className="user-info">
          <span className="user-badge">{username}</span>
          <Link to="/add" className="btn btn-primary">
            Add New Student
          </Link>
          <button onClick={handleLogout} className="btn logout-btn">
            Logout
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search students by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <table className="student-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Date of Birth</th>
            <th>Course Name</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentStudents.length === 0 ? (
            <tr>
              <td colSpan="8" style={{ textAlign: "center", padding: "40px", fontSize: "16px", color: "#888" }}>
                {searchTerm ? `📭 No students found matching "${searchTerm}"` : "📚 No students found. Click \"Add New Student\" to get started!"}
              </td>
            </tr>
          ) : (
            currentStudents.map((student) => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.full_name}</td>
                <td>{student.email}</td>
                <td>{student.phone}</td>
                <td>{new Date(student.date_of_birth).toLocaleDateString()}</td>
                <td>{student.course_name}</td>
                <td>
                  <span className={`status ${student.status.toLowerCase()}`}>
                    {student.status}
                  </span>
                </td>
                <td>
                  <Link
                    to={`/edit/${student.id}`}
                    className="btn btn-edit"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(student.id)}
                    className="btn btn-delete"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination */}
      {filteredStudents.length > studentsPerPage && (
        <div className="pagination">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            ← Previous
          </button>

          <div className="page-numbers">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                onClick={() => paginate(index + 1)}
                className={`page-number ${currentPage === index + 1 ? "active" : ""}`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next →
          </button>

          <div className="page-info">
            Page {currentPage} of {totalPages}
          </div>
        </div>
      )}
    </div>
  );
}

export default StudentList;

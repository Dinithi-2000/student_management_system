import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "../App.css";

function EditStudent() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    date_of_birth: "",
    course_name: "",
    status: "Active",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchStudent();
  }, [id]);

  const fetchStudent = async () => {
    try {
      const response = await axios.get("http://localhost:5000/students");
      const student = response.data.find((s) => s.id === parseInt(id));
      
      if (student) {
        // Format date for input type="date"
        const dateObj = new Date(student.date_of_birth);
        const formattedDate = dateObj.toISOString().split("T")[0];
        
        setFormData({
          full_name: student.full_name,
          email: student.email,
          phone: student.phone,
          date_of_birth: formattedDate,
          course_name: student.course_name,
          status: student.status,
        });
      } else {
        toast.error("Student not found");
        navigate("/students");
      }
      setLoading(false);
    } catch (err) {
      toast.error("Failed to fetch student data");
      navigate("/students");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear error for this field
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: "",
      });
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.full_name.trim()) {
      newErrors.full_name = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required";
    } else if (!/^\d{10}$/.test(formData.phone.replace(/[-\s]/g, ""))) {
      newErrors.phone = "Phone must be 10 digits";
    }

    if (!formData.date_of_birth) {
      newErrors.date_of_birth = "Date of birth is required";
    }

    if (!formData.course_name.trim()) {
      newErrors.course_name = "Course name is required";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSubmitting(true);
    try {
      await axios.put(`http://localhost:5000/students/${id}`, formData);
      toast.success("Student updated successfully!");
      navigate("/students");
    } catch (err) {
      if (err.response?.data?.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Failed to update student");
      }
    } finally {
      setSubmitting(false);
    }
  };

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
      <p style={{ color: 'white', fontSize: '18px', fontWeight: '600' }}>Loading student data...</p>
      <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); }}`}</style>
    </div>
  );

  return (
    <div className="container">
      <div className="header">
        <h1>Edit Student</h1>
        <Link to="/students" className="btn btn-secondary">
          Back to List
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="student-form">
        <div className="form-group">
          <label>Full Name *</label>
          <input
            type="text"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            className={errors.full_name ? "error" : ""}
          />
          {errors.full_name && (
            <span className="error-message">{errors.full_name}</span>
          )}
        </div>

        <div className="form-group">
          <label>Email *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? "error" : ""}
          />
          {errors.email && (
            <span className="error-message">{errors.email}</span>
          )}
        </div>

        <div className="form-group">
          <label>Phone *</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="1234567890"
            className={errors.phone ? "error" : ""}
          />
          {errors.phone && (
            <span className="error-message">{errors.phone}</span>
          )}
        </div>

        <div className="form-group">
          <label>Date of Birth *</label>
          <input
            type="date"
            name="date_of_birth"
            value={formData.date_of_birth}
            onChange={handleChange}
            className={errors.date_of_birth ? "error" : ""}
          />
          {errors.date_of_birth && (
            <span className="error-message">{errors.date_of_birth}</span>
          )}
        </div>

        <div className="form-group">
          <label>Course Name *</label>
          <input
            type="text"
            name="course_name"
            value={formData.course_name}
            onChange={handleChange}
            className={errors.course_name ? "error" : ""}
          />
          {errors.course_name && (
            <span className="error-message">{errors.course_name}</span>
          )}
        </div>

        <div className="form-group">
          <label>Status *</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <div className="form-actions">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={submitting}
          >
            {submitting ? "Updating..." : "Update Student"}
          </button>
          <Link to="/students" className="btn btn-secondary">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}

export default EditStudent;

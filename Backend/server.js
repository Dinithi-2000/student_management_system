const express = require("express");
const cors = require("cors");
require("dotenv").config();

const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.json({
    message: "Student Management System API",
    status: "Running",
    endpoints: {
      "GET /students": "Get all students",
      "POST /students": "Create a new student",
      "PUT /students/:id": "Update a student",
      "DELETE /students/:id": "Delete a student"
    }
  });
});

//create student
app.post("/students", (req, res) => {
  const { full_name, email, phone, date_of_birth, course_name, status } = req.body;

  // Basic validation
  if (!full_name || !email || !phone || !date_of_birth || !course_name || !status) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const sql = `
    INSERT INTO students 
    (full_name, email, phone, date_of_birth, course_name, status) 
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [full_name, email, phone, date_of_birth, course_name, status],
    (err, result) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          return res.status(400).json({ message: "Email already exists" });
        }
        return res.status(500).json(err);
      }

      res.json({ message: "Student added successfully" });
    }
  );
});

//get all students
app.get("/students", (req, res) => {
  db.query("SELECT * FROM students", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

//update student
app.put("/students/:id", (req, res) => {
  const { id } = req.params;
  const { full_name, email, phone, date_of_birth, course_name, status } = req.body;

  const sql = `UPDATE students SET 
    full_name=?, email=?, phone=?, date_of_birth=?, 
    course_name=?, status=? WHERE id=?`;

  db.query(sql, [full_name, email, phone, date_of_birth, course_name, status, id], 
    (err, result) => {
      if (err) return res.status(400).json(err);
      res.json({ message: "Student updated successfully" });
  });
});


//delete student
app.delete("/students/:id", (req, res) => {
  db.query("DELETE FROM students WHERE id=?", 
  [req.params.id], 
  (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Student deleted successfully" });
  });
});


app.listen(5000, () => {
  console.log("Server running on port 5000");
});

-- Create database
CREATE DATABASE IF NOT EXISTS student_crud;

-- Use the database
USE student_crud;

-- Create students table
CREATE TABLE IF NOT EXISTS students (
  id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  phone VARCHAR(20) NOT NULL,
  date_of_birth DATE NOT NULL,
  course_name VARCHAR(100) NOT NULL,
  status ENUM('Active', 'Inactive') DEFAULT 'Active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert sample data (optional)
INSERT INTO students (full_name, email, phone, date_of_birth, course_name, status) 
VALUES 
  ('John Doe', 'john.doe@example.com', '1234567890', '2000-01-15', 'Computer Science', 'Active'),
  ('Jane Smith', 'jane.smith@example.com', '0987654321', '1999-05-20', 'Business Administration', 'Active'),
  ('Mike Johnson', 'mike.johnson@example.com', '5551234567', '2001-08-10', 'Engineering', 'Inactive');

# Student Management System

A full-stack CRUD (Create, Read, Update, Delete) application for managing student records built with React, Node.js, Express, and MySQL.

## 📋 Table of Contents

1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Prerequisites](#prerequisites)
4. [Setup Instructions](#setup-instructions)
5. [How to Run the Project](#how-to-run-the-project)
6. [Database Schema](#database-schema)
7. [Project Structure](#project-structure)
8. [API Endpoints](#api-endpoints)
9. [How to Use](#how-to-use)
10. [Troubleshooting](#troubleshooting)

## Features

### Core Features
- ✅ View all students in a table format
- ✅ Add new students with form validation
- ✅ Edit existing student information
- ✅ Delete students with confirmation
- ✅ RESTful API

### Extra Features
- 🔐 **Login Page** - Simple authentication (no backend auth required)
- 🔍 **Search Functionality** - Search students by name in real-time
- 📄 **Pagination** - Browse students with page navigation (5 per page)
- 🔔 **Toast Notifications** - Modern toast messages for all actions
- 📱 **Fully Responsive UI** - Beautiful gradient design that works on all devices
- 👤 **User Session** - Display logged-in username
- 🚪 **Logout Functionality** - Secure logout with session clearing
- 🎨 **Modern UI/UX** - Gradient backgrounds, animations, and glass morphism

## Tech Stack

### Frontend
- **React.js** - JavaScript library for building user interfaces
- **React Router DOM** - Client-side routing with protected routes
- **Axios** - Promise-based HTTP client for API requests
- **React Toastify** - Toast notification library
- **CSS3** - Custom animations, gradients, and glass morphism effects

### Backend
- **Node.js**  - JavaScript runtime environment
- **Express.js**  - Web application framework
- **MySQL2**  - MySQL database driver
- **CORS** - Cross-Origin Resource Sharing middleware
- **dotenv** - Environment variable management

### Database
- **MySQL** - Relational database management system

### Development Tools
- **npm** - Package manager
- **Git** - Version control

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
- **MySQL** (v5.7 or higher) - [Download here](https://dev.mysql.com/downloads/)
- **npm** (comes with Node.js) or **yarn** package manager
- **Git** (optional, for cloning) - [Download here](https://git-scm.com/)

Check if they're installed:
```bash
node --version
npm --version
mysql --version
```

## Setup Instructions

Follow these steps carefully to set up the project on local machine.

### Step 1: Clone or Download the Repository

**Option A: Using Git**
```bash
git clone https://github.com/Dinithi-2000/student_management_system.git
cd student_management_system
```

**Option B: Download ZIP**
- Download the project as ZIP
- Extract to a folder
- Open terminal/command prompt in that folder

### Step 2: Database Setup

#### 2.1 Create the Database

1. **Start MySQL Server**
   - Windows: Open MySQL Workbench or Command Prompt
   - Mac/Linux: Run `mysql.server start`

2. **Login to MySQL**
   ```bash
   mysql -u root -p
   ```
   Enter your MySQL root password when prompted.

3. **Run the SQL Script**
   
   **Method A: From MySQL Command Line**
   ```sql
   source student_crud.sql;
   ```
   
   **Method B: Using Command Line**
   ```bash
   mysql -u root -p < student_crud.sql
   ```
   
   **Method C: Using MySQL Workbench**
   - Open MySQL Workbench
   - File → Open SQL Script
   - Select `student_crud.sql`
   - Click Execute (⚡) button

4. **Verify Database Creation**
   ```sql
   SHOW DATABASES;
   USE student_crud;
   SHOW TABLES;
   SELECT * FROM students;
   ```

#### 2.2 Configure Database Connection

1. Navigate to `Backend/db.js`
2. Update credentials if needed:
   ```javascript
   const db = mysql.createConnection({
     host: "localhost",
     user: "root",           // MySQL username
     password: "",           // MySQL password (if any)
     database: "student_crud"
   });
   ```

### Step 3: Backend Setup

1. **Navigate to Backend folder**
   ```bash
   cd Backend
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```
   
   This installs:
   - express
   - mysql2
   - cors
   - dotenv

3. **Verify Installation**
   ```bash
   npm list
   ```

4. **(Optional) Create .env File**
   ```bash
   # Backend/.env
   PORT=5000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=
   DB_NAME=student_crud
   ```

### Step 4: Frontend Setup

1. **Open a NEW terminal** (keep backend terminal open)

2. **Navigate to Frontend folder**
   ```bash
   cd frontend
   ```
   (If you're in Backend folder, use: `cd ../frontend`)

3. **Install Dependencies**
   ```bash
   npm install
   ```
   
   This installs:
   - react
   - react-dom
   - react-router-dom
   - axios
   - react-toastify
   - web-vitals

4. **Verify Installation**
   ```bash
   npm list
   ```

## How to Run the Project

### Starting the Application

Need TWO terminal windows running simultaneously:

#### Terminal 1: Start Backend Server

```bash
# Navigate to Backend folder
cd Backend

# Start the server
npm start
# OR
node server.js
```

**Expected Output:**
```
Server running on port 5000
Connected to MySQL
```

Backend is now running at: `http://localhost:5000`

#### Terminal 2: Start Frontend Application

```bash
# Navigate to Frontend folder (in new terminal)
cd frontend

# Start React app
npm start
```

**Expected Output:**
```
Compiled successfully!
You can now view the app in the browser.

Local:            http://localhost:3000
On Your Network:  http://192.168.x.x:3000
```

**The browser should automatically open** to `http://localhost:3000`

If not, manually open your browser and go to: `http://localhost:3000`

### ✅ Success Indicators

- Backend terminal shows: "Connected to MySQL"
- Frontend terminal shows: "Compiled successfully!"
- Browser opens to login page
- No error messages in either terminal

### 🛑 Stopping the Application

- Backend: Press `Ctrl + C` in backend terminal
- Frontend: Press `Ctrl + C` in frontend terminal
- Confirm with `Y` if prompted

## Database Schema

### Database Name: `student_crud`

### Table: `students`

**SQL Schema:**
```sql
CREATE TABLE students (
  id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  phone VARCHAR(20) NOT NULL,
  date_of_birth DATE NOT NULL,
  course_name VARCHAR(100) NOT NULL,
  status ENUM('Active', 'Inactive') NOT NULL DEFAULT 'Active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

**Field Details:**

| Field Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| `id` | INT | Primary Key, Auto Increment | Unique identifier for each student |
| `full_name` | VARCHAR(100) | NOT NULL | Student's full name |
| `email` | VARCHAR(100) | NOT NULL, UNIQUE | Student's email address (must be unique) |
| `phone` | VARCHAR(20) | NOT NULL | Student's contact number |
| `date_of_birth` | DATE | NOT NULL | Student's date of birth |
| `course_name` | VARCHAR(100) | NOT NULL | Name of the course/program |
| `status` | ENUM | NOT NULL, DEFAULT 'Active' | Student status (Active/Inactive) |
| `created_at` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Record creation timestamp |
| `updated_at` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP ON UPDATE | Last update timestamp |

**Sample Data:**
```sql
INSERT INTO students (full_name, email, phone, date_of_birth, course_name, status) VALUES
('John Doe', 'john.doe@example.com', '1234567890', '2000-05-15', 'Computer Science', 'Active'),
('Jane Smith', 'jane.smith@example.com', '9876543210', '1999-08-22', 'Information Technology', 'Active'),
('Mike Johnson', 'mike.johnson@example.com', '5551234567', '2001-03-10', 'Software Engineering', 'Inactive');
```

**Indexes:**
- Primary Key on `id`
- Unique Index on `email`

**Relationships:**
- Currently standalone table (no foreign keys)
- Can be extended to link with courses, grades, or attendance tables

## Project Structure

```
student_management_system/
├── Backend/
│   ├── db.js              # Database connection
│   ├── server.js          # Express server and API routes
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.js          # Login page
│   │   │   ├── StudentLIst.js    # List all students (with search & pagination)
│   │   │   ├── AddStudent.js     # Add new student
│   │   │   └── EditStudent.js    # Edit student
│   │   ├── App.js         # Main app with protected routes
│   │   ├── App.css        # Modern styling with gradients
│   │   └── index.js
│   └── package.json
├── student_crud.sql      # Database schema
└── README.md
```

## How to Use

> **Note:** Before using the application, make sure you have completed the [Setup Instructions](#setup-instructions) and the application is [running](#how-to-run-the-project).

### 1. Login
- Open the app at `http://localhost:3000`
- Enter any username and password (e.g., "admin" / "password")
- Click "Login" (credentials are not validated - simple frontend authentication)
- You'll be redirected to the Student List page

### 2. View Students
- See all students in a paginated table
- Use the search bar to filter by name
- View 5 students per page

### 3. Add Student
- Click "Add New Student" button
- Fill in all required fields
- Click "Add Student" to save
- Toast notification confirms success

### 4. Edit Student
- Click "Edit" button next to any student
- Modify the information
- Click "Update Student" to save changes

### 5. Delete Student
- Click "Delete" button next to any student
- Confirm the deletion
- Student is removed immediately

### 6. Search Students
- Type in the search bar at the top
- Results filter in real-time
- Search works on student full names

### 7. Pagination
- Navigate pages using "Previous" and "Next" buttons
- Click page numbers to jump to specific pages
- Shows current page and total pages

### 8. Logout
- Click "Logout" button in header
- Returns to login page
- Session is cleared

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/` | API info and endpoint list |
| GET    | `/students` | Get all students |
| POST   | `/students` | Create a new student |
| PUT    | `/students/:id` | Update a student |
| DELETE | `/students/:id` | Delete a student |

## Form Validation

- Full Name: Required
- Email: Required, must be valid email format, unique in database
- Phone: Required, must be 10 digits
- Date of Birth: Required
- Course Name: Required
- Status: Active or Inactive (dropdown)

## UI Features

### Design Elements
- 🌈 Animated gradient background
- 🪟 Glass morphism effects
- ✨ Smooth animations and transitions
- 🎭 Hover effects on interactive elements
- 📱 Fully responsive for mobile and tablet

### Toast Notifications
- ✅ Success: Green toast for successful operations
- ❌ Error: Red toast for errors
- ℹ️ Info: Blue toast for informational messages
- Auto-dismiss after 3 seconds

### Loading States
- Spinning loader while fetching data
- Button disabled states during submission
- Loading text feedback

## Troubleshooting

### Port Already in Use
If port 5000 or 3000 is already in use:
- Backend: Change port in `server.js`
- Frontend: Create `.env` file with `PORT=3001`

### Database Connection Error
- Verify MySQL is running
- Check credentials in `db.js`
- Ensure database `student_crud` exists
- Look for "Connected to MySQL" message in backend terminal

### Can't Access Student Pages
- Make sure you're logged in
- Check if `isLoggedIn` is in localStorage
- Try refreshing the page

### CORS Error
- Ensure backend server is running on port 5000
- Check CORS configuration in `server.js`
- Verify frontend is making requests to correct URL

### Search Not Working
- Make sure you're typing in the search bar at the top
- Search is case-insensitive
- Search filters by full name only

### Toast Not Showing
- Check browser console for errors
- Ensure react-toastify is installed
- Check if ToastContainer is in App.js

## Implemented Features Summary

### ✅ Completed
- [x] Full CRUD operations
- [x] Simple login page (no backend auth)
- [x] Search students by name
- [x] Pagination (5 students per page)
- [x] Toast/alert messages
- [x] Fully responsive UI
- [x] Form validation
- [x] Protected routes
- [x] User session display
- [x] Logout functionality
- [x] Modern gradient UI with animations


## Author

Dinithi-2000

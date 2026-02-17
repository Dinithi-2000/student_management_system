# Student Management System

A full-stack CRUD (Create, Read, Update, Delete) application for managing student records built with React, Node.js, Express, and MySQL.

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
- React.js
- React Router DOM (Protected Routes)
- Axios
- React Toastify
- CSS3 (Custom animations & gradients)

### Backend
- Node.js
- Express.js
- MySQL2
- CORS

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- MySQL (v5.7 or higher)
- npm or yarn

## Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/Dinithi-2000/student_management_system.git
cd student_management_system
```

### 2. Database Setup

1. Open MySQL and run the `student_crud.sql` file:
```bash
mysql -u root -p < student_crud.sql
```

Or manually execute the SQL script in MySQL Workbench or phpMyAdmin.

2. Update database credentials in `Backend/db.js` if needed:
```javascript
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "", // Add your MySQL password
  database: "student_crud"
});
```

### 3. Backend Setup

```bash
cd Backend
npm install
npm start
```

The backend server will run on `http://localhost:5000`

### 4. Frontend Setup

Open a new terminal window:

```bash
cd frontend
npm install
npm start
```

The React app will run on `http://localhost:3000`

### 5. Login

- Navigate to `http://localhost:3000`
- Enter any username and password (no real authentication)
- Click Login to access the Student Management System

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

### 1. Login
- Open the app at `http://localhost:3000`
- Enter any username and password
- Click "Login" (credentials are not validated)

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

## Student Schema

| Field | Type | Required | Unique |
|-------|------|----------|--------|
| id | INT | Auto | Yes |
| full_name | VARCHAR(100) | Yes | No |
| email | VARCHAR(100) | Yes | Yes |
| phone | VARCHAR(20) | Yes | No |
| date_of_birth | DATE | Yes | No |
| course_name | VARCHAR(100) | Yes | No |
| status | ENUM('Active', 'Inactive') | Yes | No |
| created_at | TIMESTAMP | Auto | No |
| updated_at | TIMESTAMP | Auto | No |

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

### 🔮 Future Enhancements
- [ ] Export to CSV/PDF
- [ ] Real backend authentication with JWT
- [ ] Student photo upload
- [ ] Bulk operations
- [ ] Advanced filtering (by course, status, date range)
- [ ] Sort by column
- [ ] Email notifications
- [ ] Student attendance tracking
- [ ] Grade management
- [ ] Image upload for students
- [ ] Bulk operations

## License

This project is created for educational purposes as part of a CRUD assignment.

## Author

Dinithi-2000

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

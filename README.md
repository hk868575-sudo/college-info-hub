# College Info Hub

## College Notice Board Website with Dynamic Updates

College Info Hub is a web-based college notice board system designed to provide students with quick and easy access to important college notices.

The system allows students to view, search and filter notices, while administrators can securely manage notices through an admin dashboard.

## Project Objective

The main objective of this project is to create a centralized digital notice board where college notices can be managed and accessed easily.

### Objectives

- Provide students with the latest college notices.
- Allow students to search notices.
- Allow filtering notices by category.
- Display complete notice details.
- Provide secure admin login.
- Allow administrators to add, edit and delete notices.
- Store notices dynamically in MongoDB.
- Provide a simple and responsive user interface.

## Technologies Used

### Frontend

- HTML5
- CSS3
- JavaScript

### Backend

- Node.js
- Express.js

### Database

- MongoDB
- Mongoose

### Authentication

- JSON Web Token (JWT)
- bcrypt

### Development Tools

- Visual Studio Code
- Git

## Features

### Student Features

- View latest college notices.
- View all available notices.
- Search notices by title or description.
- Filter notices by category.
- View complete notice details.
- View notice publish date and event date.
- Highlight newly created notices.
- Responsive design for mobile devices.

### Admin Features

- Secure admin login.
- JWT-based authentication.
- Admin dashboard.
- View total number of notices.
- Add new notices.
- Edit existing notices.
- Delete notices.
- View notice details.
- Logout functionality.

## System Architecture

The project follows a simple client-server architecture.

```text
Student / Admin
      |
      v
HTML + CSS + JavaScript
      |
      | HTTP / JSON
      v
Node.js + Express.js
      |
      v
Mongoose
      |
      v
MongoDB Atlas
```

## Project Structure

```text
college-info-hub/
│
├── backend/
│   ├── server.js
│   ├── config/
│   │   └── db.js
│   ├── models/
│   │   ├── Notice.js
│   │   └── Admin.js
│   ├── routes/
│   │   ├── noticeRoutes.js
│   │   └── adminRoutes.js
│   ├── controllers/
│   │   ├── noticeController.js
│   │   └── adminController.js
│   └── middleware/
│       └── authMiddleware.js
│
├── frontend/
│   ├── index.html
│   ├── notices.html
│   ├── notice.html
│   ├── admin/
│   │   ├── login.html
│   │   ├── dashboard.html
│   │   └── notice-form.html
│   ├── css/
│   │   ├── style.css
│   │   └── admin.css
│   └── js/
│       ├── home.js
│       ├── notices.js
│       ├── notice-details.js
│       ├── login.js
│       ├── dashboard.js
│       └── notice-form.js
│
├── .env
├── .gitignore
├── package.json
└── README.md
```

## Database Design

The project uses MongoDB Atlas as the database.

### Database Name

`college_info_hub`

### Collections

#### Notices

The `notices` collection stores all college notices.

| Field         | Type     | Description                   |
| ------------- | -------- | ----------------------------- |
| `_id`         | ObjectId | Unique notice ID              |
| `title`       | String   | Notice title                  |
| `category`    | String   | Notice category               |
| `description` | String   | Notice details                |
| `publishDate` | Date     | Date when notice is published |
| `eventDate`   | Date     | Date of the related event     |
| `createdAt`   | Date     | Record creation time          |
| `updatedAt`   | Date     | Last update time              |

#### Admins

The `admins` collection stores administrator account information.

| Field       | Type     | Description           |
| ----------- | -------- | --------------------- |
| `_id`       | ObjectId | Unique admin ID       |
| `username`  | String   | Admin username        |
| `password`  | String   | Hashed admin password |
| `createdAt` | Date     | Account creation time |
| `updatedAt` | Date     | Last update time      |

## API Endpoints

The backend provides REST API endpoints for managing notices and admin authentication.

### Notice APIs

| Method | Endpoint           | Description         | Access |
| ------ | ------------------ | ------------------- | ------ |
| GET    | `/api/notices`     | Get all notices     | Public |
| GET    | `/api/notices/:id` | Get a single notice | Public |
| POST   | `/api/notices`     | Create a new notice | Admin  |
| PUT    | `/api/notices/:id` | Update a notice     | Admin  |
| DELETE | `/api/notices/:id` | Delete a notice     | Admin  |

### Admin API

| Method | Endpoint           | Description | Access |
| ------ | ------------------ | ----------- | ------ |
| POST   | `/api/admin/login` | Admin login | Public |

### Search and Filter

Notices can be searched and filtered using query parameters.

Example:

`GET /api/notices?search=Sports`

`GET /api/notices?category=Event`

Both search and category filtering can also be used together.

## How to Run the Project

### 1. Install Dependencies

Open the terminal in the project folder and run:

```bash
npm install
```

## Future Scope

The project can be further improved by adding the following features:

- Real-time notice updates using WebSockets.
- Email notifications for important notices.
- Student registration and personalized notifications.
- Notice attachments such as PDF and images.
- Pagination for a large number of notices.
- Advanced admin roles and permissions.
- Cloud deployment for public access.
- Improved analytics and notice statistics.

## Conclusion

College Info Hub provides a simple and centralized platform for managing and accessing college notices.

The project demonstrates the practical use of frontend development, REST APIs, backend programming, database management and authentication in a full-stack web application.

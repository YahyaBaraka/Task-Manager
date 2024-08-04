# Task Manager

## Introduction

A robust web application for efficient task management, allowing users to create, update, delete, and organize their tasks with ease.


![image](https://github.com/user-attachments/assets/d2e62d2a-158e-4907-82ad-6a69b09999ad)


## Features

- User authentication (signup and login)

- Create, read, update, and delete tasks

- Mark tasks as complete or incomplete

- Filter tasks by status

- Sort tasks by priority, due date, or title

- Responsive design for desktop and mobile devices

## Tech Stack

### Frontend

- React.js

- HTML5

- CSS3

- JavaScript (ES6+)

### Backend

- Node.js

- Express.js

- MongoDB

### Testing

- Jest

- Supertest

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14.x or later)

- [npm](https://www.npmjs.com/) (v6.x or later)

- [MongoDB](https://www.mongodb.com/) (v4.x or later)

## Installation

1\. Clone the repository:

   ```bash

   git clone https://github.com/YahyaBaraka/Task-Manager.git

   cd Task-Manager

   ```

2\. Install backend dependencies:

   ```bash

   cd backend

   npm install

   ```

3\. Install frontend dependencies:

   ```bash

   cd ../frontend

   npm install

   ```

4\. Set up environment variables:

   Modify the `.env` file in the `backend` directory with the following content:

   ```

   PORT=4000

   MONGODB_URI=mongodb://your_mongodb_uri

   JWT_SECRET=your_jwt_secret

   ```

   Replace `your_mongodb_uri` and `your_jwt_secret` with your actual MongoDB connection string and a secure secret for JWT.

## Running the Application

1\. Start the backend server:

   ```bash

   cd backend

   npm start

   ```

2\. In a new terminal, start the frontend development server:

   ```bash

   cd frontend

   npm start

   ```

3\. Open your browser and navigate to `http://localhost:3000` to use the application.

## Usage

1. **Sign Up / Log In**
   - Navigate to the signup page if you're a new user.
   - Enter a valid email address.
   - Create a strong password (should contain numbers, symbols, and capital letters).
   - Click "Submit" to create your account.
   - If you already have an account, go to the login page.
   - Enter your registered email and password.
   - Click "Submit" to access your account.

2. **Create a Task**
   - From your dashboard, click on the "Add Task" button.
   - Fill in the task details:
     - Title: A brief, descriptive name for your task.
     - Description: Additional details or notes about the task.
     - Due Date: Set a deadline for task completion.
     - Priority: Choose between Low, Medium, or High.
   - Click "Add" to save the new task.

3. **Manage Tasks**
   - View all your tasks on the main dashboard.
   - To edit a task:
     - Click the "Edit" button next to the task you want to modify.
     - Update any of the task details in the edit form.
     - Click "Update" to save your changes.
   - To delete a task:
     - Locate the task you wish to remove.
     - Click the "Delete" button next to it.
     - Confirm the deletion when prompted.
   - To mark a task as complete or incomplete:
     - Find the checkbox next to the task.
     - Click to toggle between complete and incomplete status.

4. **Filter and Sort Tasks**
   - Use the filter dropdown to view tasks by status:
     - Select "All" to see all tasks.
     - Choose "Complete" or "Incomplete" to filter accordingly.
   - Sort your tasks using the sort dropdown:
     - "Priority": Arrange tasks from highest to lowest priority.
     - "Due Date": Order tasks from earliest to latest deadline.
     - "Title": Sort tasks alphabetically by title.

5. **Logout**
   - To securely exit the application, click the "Logout" button.
   - This will end your session and return you to the login page.

Remember to regularly save your changes and refresh the task list to see the most up-to-date information. If you encounter any issues or have questions about using the Task Manager, don't hesitate to reach out for support.
     
## Testing

Run the test suite for the backend:

```bash

cd backend

npm test

```


## Contact

If you have any questions, feel free to contact me at [yahyabarka84@gmail.com].

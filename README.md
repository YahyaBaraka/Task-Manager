# Task Manager

## Introduction

Task Manager is a simple web application designed to help users manage their tasks efficiently. This application allows users to create, update, delete, and view tasks.

## Features

- Create new tasks
- Edit existing tasks
- Delete tasks
- View all tasks
- Mark tasks as complete or incomplete

## Technologies Used

- HTML
- CSS
- JavaScript
- Node.js
- Express
- MongoDB

## Prerequisites

Before you begin, ensure you have met the following requirements:

- You have installed Node.js and npm (Node Package Manager).
- You have a MongoDB database set up and running.
- You have a web browser (Chrome, Firefox, etc.) installed.

## Installation

Follow these steps to set up and run the application:

1. **Clone the repository**

   ```bash
   git clone https://github.com/YahyaBaraka/Task-Manager.git
   ```

2. **Navigate to the project directory**

   ```bash
   cd Task-Manager
   ```

3. **Open two terminal windows inside your IDE**

4. **For the first one run the following commands to install the backend part dependencies**

   ```bash
   cd backend
   npm install
   ```
5. **For the Second one run the following commands to install the frontend part dependencies**

   ```bash
   cd frontend
   npm install
   ```

6. **Set up environment variables**

   Modify the `.env` file in the backend directory and add the following variables:

   ```env
   PORT=4000
   MONGODB_URI=mongodb:"YOUR MONGODB URI"
   ```

   Replace the `MONGODB_URI` value with your MongoDB connection string.

## Running the Application

To start the application, run the following command in both terminals (frontend terminal and backend terminal):

```bash
npm start
```

The application will start, and you can access it at `http://localhost:3000` in your web browser.

## Usage

1. **Create a Task**

   - Navigate to the homepage.
   - Click on "Add Task".
   - Fill in the task details and click "Save".

2. **Edit a Task**

   - Click on the task you want to edit.
   - Update the task details and click "Save".

3. **Delete a Task**

   - Click on the "Delete" button next to the task you want to remove.

4. **View All Tasks**

   - The homepage displays all the tasks.
   - You can filter tasks by their status (complete or incomplete).
   - You can sort tasks by their (priority, dueDate, title)
     
## Tests


1. **Ensure you have the testing dependencies installed:**

```bash
npm install --save-dev mocha chai supertest
```

2. **Run Tests in the backend directory**

```bash
npm test
```


## Contact

If you have any questions, feel free to contact me at [yahyabarka84@gmail.com].

Project Name: To Do List App

Description: 
    The project is build using Express.Js, MySQL, Node.js, Supertest, Jest & Bootstrap also other tools/softwares used follows: Postman, Microsoft Edge, ChatGpt and also Github. The project aims to showcase basic usage of CRUD for a to do list app. 

Accessibility:
    The application is already hosted and running following this link:
        ~~https://carloicorcuera.github.io/to-do-list-application/~~

Features:
    Create Task: Adds a new task/to-do item, this includes title, author and task.
    View Tasks: An index.html is also developed to view and fetched all the tasked created in our DB.
    Update Task: The application is also capable of updating an added task in our DB.
    Delete Task: An archieved feature is also added to mimic the delete function.

Installation:
    Node.js installed on your local machine.
    A MongoDB instance running locally or remotely.

Steps:
    Clone the repository:
        git clone https://github.com/carloicorcuera/to-do-list-app-MySQL--CRUD-.git
    
    Navigate to the project directory:
        cd to-do-list-app-MySQL--CRUD-/

    Install dependencies:
        npm install
    
    Setup SQL Scripts:
        CREATE DATABASE ToDoListApp;
        USE ToDoListApp;

        CREATE TABLE tasks (
            id INT AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            author VARCHAR(255) NOT NULL,
            imagePath VARCHAR(255) NOT NULL;
            task VARCHAR(255) NOT NULL,
            isActive TINYINT(1) NOT NULL DEFAULT 1,
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );

    Start the server:
        npm start

    Run the test:
        ~~npm run test~~
        Issues arise since the integration of upload file/image that was pass through the test cases in MySQL. 

Usage:
    1. Accessing the Application:
        - Open your web browser and navigate to http://localhost:8008 (or the configured port).
    
    2. Adding a Task:
        - Use the provided form to input the task's title, author, description and even file/images. Submit to create a new task.
    
    3. Viewing Tasks:
        - The main page displays tasks in a paginated format. Navigate through pages to view more tasks.
    
    4. Deleting a Task:
        - Each task card has a delete button. Clicking this button will archive the task and remove it from the active list.

API Reference:
    Endpoints
        - GET /tasks/all: Fetches all tasks.
        - POST /tasks/register: Registger a new task.
        - PATCH /tasks/update/:id: Updates a task based on its ID
        - DELETE /tasks/delete/:id: Archieves (deletes) a task based on its ID
// Example assuming you have a MySQL setup and a test database
const request = require("supertest");
const mysql = require('mysql2/promise');
const app = require("../app"); // Ensure this points to your Express app

// Your MySQL database test configuration
const dbConfig = {
  host            : '127.0.0.1',
  user            : 'root',
  password        : 'admin',
  database        : 'todolistapp',
};

let pool;

/* Connecting to the database before each test. */
beforeEach(async () => {
    pool = await mysql.createPool(dbConfig);
});

/* Closing database connection after each test. */
afterEach(async () => {
    await pool.end(); // Close the pool after each test
});

// describe("GET /tasks/all", () => {

//   it("should return 404 when no active tasks are found", async () => {
//       // ... assuming no active tasks are present ...
//       // Make sure your database is in a known state or mock the database response appropriately

//       const res = await request(app).get("/tasks/all");
//       expect(res.statusCode).toBe(404);
//       expect(res.body).toHaveProperty('message', 'No tasks found');
//   });

//   it("should return tasks with the correct structure and data types", async () => {
//     const res = await request(app).get("/tasks/all");
//     expect(res.statusCode).toBe(200);
//     expect(res.body).toHaveProperty('tasks');
//     expect(Array.isArray(res.body.tasks)).toBe(true); // Now checking for array within 'tasks' key

//     res.body.tasks.forEach(task => {
//       expect(task).toHaveProperty('id');
//       expect(task).toHaveProperty('title');
//       expect(typeof task.title).toBe('string');
//       expect(task).toHaveProperty('author');
//       expect(typeof task.author).toBe('string');
//       expect(task).toHaveProperty('imagePath');  
//       expect(typeof task.imagePath).toBe('string'); 
//       expect(task).toHaveProperty('task');
//       expect(typeof task.task).toBe('string');
//       expect(task).toHaveProperty('isActive');
//       // isActive will be 1 or 0, check accordingly
//       expect([true, false, 0, 1]).toContain(task.isActive);
//       expect(task).toHaveProperty('createdAt');
//       expect(new Date(task.createdAt)).toBeInstanceOf(Date);
//       expect(task).toHaveProperty('updatedAt');
//       expect(new Date(task.updatedAt)).toBeInstanceOf(Date);
//     });
//   });

// });

// describe("POST /tasks/create-task", () => {

//   it("should successfully register a new task", async () => {
//       // Mock request data for a new task
//       const newTaskData = {
//           title: "RRARR Task Title1212",
//           author: "Unique1 Task Author",
//           task: "Unique1 Task description"
//           // isActive and timestamps are managed by MySQL in this setup
//       };
  
//       const res = await request(app).post("/tasks/create-task").send(newTaskData);
//       expect(res.statusCode).toBe(201);
//       expect(res.body).toHaveProperty('message', 'Task successfully registered!');
//       expect(res.body).toHaveProperty('taskId'); // Reflecting the actual property name
//   });

//   it("should return 400 for invalid task data", async () => {
//       const invalidData = {}; // Empty data or structure incorrect data as per requirements
  
//       const res = await request(app).post("/tasks/create-task").send(invalidData);
//       expect(res.statusCode).toBe(400);
//       expect(res.body).toHaveProperty('error', 'Request is Empty');
//   });

//   it("should prevent duplicate task titles", async () => {
//       // Insert a task with a unique title into the test database or mock the response
//       // ...

//       const duplicateTaskData = {
//           title: "New Task",
//           author: "Task Author",
//           task: "Task description"
//       };
  
//       const res = await request(app).post("/tasks/create-task").send(duplicateTaskData);
//       expect(res.statusCode).toBe(400);
//       expect(res.body).toHaveProperty('message', 'Title already registered!');
//   });

// });

describe("PATCH /tasks/update/:id", () => {

    it("should successfully update an existing task", async () => {
        const validTaskId = 11; // Use an actual numeric ID
        const updateData = {
            title: "200 Updated Task Title",
            author: "200 Updated Task Author",
            task: "200 Updated Task Description",
            // Simulate file upload here
        };
      
        // Mock or simulate a file upload with the request
        const res = await request(app)
            .patch(`/tasks/update/${validTaskId}`)
            .field('title', updateData.title)
            .field('author', updateData.author)
            .field('task', updateData.task)
            // Include file data; adjust the path and file type to suit your needs
            .attach('file', 'C:\Users\Carlo Corcuera\Downloads\EDT_wallpaper-961fc9689ae918112d2bf846c406c673.jpg');
      
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('message', 'Task successfully updated!');
      });
      
      it("should return 404 when task is not found", async () => {
        const nonExistentTaskId = 99999; // Use a likely non-existent ID
        const updateData = {
            title: "404 Updated Task Title",
            author: "404 Updated Task Author",
            task: "404 Updated Task Description",
        };
      
        const res = await request(app)
            .patch(`/tasks/update/${nonExistentTaskId}`)
            .send(updateData); // Normally you would attach file here too
        
        expect(res.statusCode).toBe(404);
        expect(res.body).toHaveProperty('message', 'Task not found');
      });
      
    it("should handle invalid update data", async () => {
    const invalidUpdateData = {}; // No data provided
    const validTaskId = 1; // Use an actual numeric ID
    
    // Send the request without any data or file
    const res = await request(app)
        .patch(`/tasks/update/${validTaskId}`)
        .send(invalidUpdateData);
    
    expect(res.statusCode).toBe(400); 
    expect(res.body).toHaveProperty('error', 'Invalid input data, missing title, author, task, or file');
    });
      
});

describe("DELETE /tasks/delete/:id", () => {

  it("should successfully archive an existing task", async () => {
      // Assume validTaskId is an ID of an existing task
      const validTaskId = 1; // Use an actual numeric ID

      const res = await request(app).delete(`/tasks/delete/${validTaskId}`);
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('message', 'Task successfully archived!');
      // Depending on how your MySQL setup responds, adjust the next line accordingly
      // It might not return the task details by default, just a success message.
  });

  it("should return 404 when task is not found", async () => {
      const nonExistentTaskId = 99999; // Use a likely non-existent ID

      const res = await request(app).delete(`/tasks/delete/${nonExistentTaskId}`);
      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty('message', 'Task not found');
  });

});
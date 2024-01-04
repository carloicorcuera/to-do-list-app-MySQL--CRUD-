const pool = require('../db.js');

// Create Task
module.exports.registerTask = async (request, response) => {
    const { title, author, task } = request.body;

    try {
      if (!title || !author || !task) {
        return response.status(400).json({ error: "Request is Empty" });
      }
    
        // Check if email already exists in the database
        const [existingTasks] = await pool.query("SELECT * FROM tasks WHERE title = ?", [title]);
    
        if (existingTasks.length > 0) {
          return response.status(400).json({ message: "Title already registered!" });
        }
    
        // Business logic for user registration
        const [result] = await pool.query("INSERT INTO tasks (title, author, task) VALUES (?, ?, ?)", [title, author, task]);

        // Respond with success message
        response.status(201).json({
          message: 'Task successfully registered!',
          taskId: result.insertId  // ID of the new task
        });
      
      } catch (error) {
        console.error('Error in register:', error);
        response.status(500).json({ error: 'Internal Server Error' });
      }
};

// Get Task
module.exports.getTasks = async (request, response) => {
  try {
      const [tasks, fields] = await pool.query("SELECT * FROM tasks WHERE isActive = 1 ORDER BY createdAt DESC");
      
      // Check if any tasks were found
      if (tasks.length === 0) {
          return response.status(404).json({ message: 'No tasks found' });
      }

      // Respond with the tasks found
      response.status(200).json({
        tasks // Sending back the array of tasks found
      });

  } catch (error) {
      console.error('Error in getting tasks:', error);
      response.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update Task
module.exports.updateTask = async (request, response) => {
    try {

        const { title, author, task } = request.body;

        // Extract _id and update details from request
        const taskId = request.params.id; // assuming _id is passed as URL parameter

        // Check for required fields
        if (!title || !author || !task) {
            return response.status(400).json({ error: "Invalid input data, missing title, author, or task" });
        };

        const [result] = await pool.query("UPDATE tasks SET title = ?, author = ?, task = ? WHERE id = ?", [title, author, task, taskId]);

        // Check if any task was actually updated
        if (result.affectedRows === 0) {
            return response.status(404).json({ message: 'Task not found' });
        }

        // Respond with success message
        response.status(200).json({
            message: 'Task successfully updated!',
            taskId: taskId  // Returning the ID of the updated task
        });

    } catch (error) {
        console.error('Error in updating task:', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
};

// Archive Task
module.exports.archiveTask = async (request, response) => {
  try {
      const taskId = request.params.id; // Extracting _id from the request URL parameter

      // Execute the update query to set isActive to false (0)
      const [result] = await pool.query("UPDATE tasks SET isActive = 0 WHERE id = ?", [taskId]);

      // Check if any task was actually updated
       if (result.affectedRows === 0) {
          return response.status(404).json({ message: 'Task not found' });
      }

      // Respond with success message
      response.status(200).json({
          message: 'Task successfully archived!',
          taskId: taskId  // Returning the ID of the archived task
      });

  } catch (error) {
      console.error('Error in archiving task:', error);
      response.status(500).json({ error: 'Internal Server Error' });
  }
};








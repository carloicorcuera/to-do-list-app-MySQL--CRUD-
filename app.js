const express = require("express");
const cors = require('cors');

const dotenv = require('dotenv');

dotenv.config();

const taskRoutes = require('./routes/taskRoutes');

const app = express();
const port = 8008;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/tasks', taskRoutes)

app.listen(port, () => {
	console.log(`API is now running on localhost: ${port}`);
});

module.exports = app;
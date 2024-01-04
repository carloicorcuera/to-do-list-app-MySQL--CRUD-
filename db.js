const mysql = require('mysql2');

// Create a connection pool
const pool = mysql.createPool({
    host            : '127.0.0.1',
    user            : 'root',
    password        : 'admin',
    database        : 'todolistapp',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
}).promise()

// Export the pool
module.exports = pool;

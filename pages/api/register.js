// /pages/api/register.js
import mysql from 'mysql2';

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Update with your MySQL user
  password: 'password', // Update with your MySQL password
  database: 'patient_registration', // Replace with your database name
});

db.connect();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { firstName, lastName, email, password } = req.body;

    // Check if user already exists
    db.execute('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }

      if (results.length > 0) {
        return res.status(400).json({ error: 'User already exists' });
      }

      // Insert new user into database
      const query = 'INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)';
      db.execute(query, [firstName, lastName, email, password], (err) => {
        if (err) {
          return res.status(500).json({ error: 'Failed to register user' });
        }

        res.status(201).json({ message: 'User registered successfully' });
      });
    });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

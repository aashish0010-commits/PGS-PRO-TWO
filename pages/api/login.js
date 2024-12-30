// /pages/api/login.js
import mysql from 'mysql2';

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', 
  password: 'password', 
  database: 'patient_registration', 
});

db.connect();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    // Check if user exists
    db.execute('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }

      if (results.length === 0 || results[0].password !== password) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // User is authenticated, redirect to homepage or return success message
      res.status(200).json({ message: 'Login successful', user: results[0] });
    });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

// /pages/api/login.js
import mysql from 'mysql2';
import jwt from 'jsonwebtoken';

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'patient_registration',
});

db.connect();

const SECRET_KEY = 'your_secret_key'; // Replace with your secret key

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    db.execute('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }

      if (results.length === 0) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const user = results[0];
      if (user.password !== password) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // User is authenticated, create a token
      const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: '1h' });
      return res.status(200).json({ message: 'Login successful', token });
    });
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
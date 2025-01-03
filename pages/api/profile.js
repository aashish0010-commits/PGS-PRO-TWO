// /pages/api/profile.js
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
  if (req.method === 'GET') {
    const token = req.headers.authorization?.split(' ')[1]; // Extract the token from the header

    if (!token) {
      return res.status(401).json({ error: 'Token is required' });
    }

    try {
      const decoded = jwt.verify(token, SECRET_KEY);
      const email = decoded.email;

      db.execute('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
        if (err) {
          return res.status(500).json({ error: 'Database error' });
        }

        if (results.length === 0) {
          return res.status(404).json({ error: 'User not found' });
        }

        return res.status(200).json({ user: results[0] });
      });
    } catch (error) {
      return res.status(403).json({ error: 'Invalid token' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
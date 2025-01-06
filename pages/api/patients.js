// pages/api/patients.js
import mysql from 'mysql2/promise';

const db = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'patient_registration',
});

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Fetch all users from the database
      const [rows] = await db.execute('SELECT id, first_name, last_name, email FROM users');
      const users = rows.map(row => ({
        fullName: `${row.first_name} ${row.last_name}`,
        email: row.email,
      }));
      res.status(200).json({ users }); // Corrected the key to 'users'
    } catch (error) {
      console.error('Database Error:', error);
      res.status(500).json({ error: 'Error fetching patients' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
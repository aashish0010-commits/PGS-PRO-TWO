// pages/api/login-doctor.js
import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs'; 

const db = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'doctor_registration',
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    try {
      const [rows] = await db.execute('SELECT * FROM doctors WHERE email = ?', [email]);

      if (rows.length === 0) {
        return res.status(400).json({ error: 'Invalid credentials' });
      }

      const doctor = rows[0];
      const passwordMatch = await bcrypt.compare(password, doctor.password);

      if (passwordMatch) {
        res.status(200).json({ message: 'Login successful', redirectTo: `/doctor/${doctor.id}` });
      } else {
        res.status(400).json({ error: 'Invalid credentials' });
      }
    } catch (error) {
      console.error('Database Error:', error);
      res.status(500).json({ error: 'Error logging in doctor' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
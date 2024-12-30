// pages/api/get-doctor-profile.js
import mysql from 'mysql2/promise';

const db = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'doctor_registration',
});

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { id } = req.query;

    try {
      const [rows] = await db.execute('SELECT * FROM doctors WHERE id = ?', [id]);

      if (rows.length === 0) {
        return res.status(404).json({ error: 'Doctor not found' });
      }

      res.status(200).json(rows[0]);
    } catch (error) {
      console.error('Database Error:', error);
      res.status(500).json({ error: 'Error fetching doctor profile' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
// app/api/appointments/getAppointments.js
import mysql from 'mysql2';

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'doctors_appointment',
});

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const appointments = await new Promise((resolve, reject) => {
        db.query('SELECT * FROM appointments', (err, result) => {
          if (err) reject(err);
          resolve(result);
        });
      });

      res.status(200).json(appointments);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch appointments', error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}

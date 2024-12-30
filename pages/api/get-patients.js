// /pages/api/get-patients.js
import mysql from 'mysql2';

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'doctors_appointment',
});

export default async function handler(req, res) {
  const { doctorId } = req.query;

  if (!doctorId) {
    return res.status(400).json({ message: 'Doctor ID is required' });
  }

  try {
    const [patients] = await db.promise().query(
      'SELECT * FROM appointments WHERE doctor = ?',
      [doctorId]
    );

    res.status(200).json(patients);
  } catch (error) {
    console.error('Error fetching patients:', error);
    res.status(500).json({ message: 'Failed to fetch patients' });
  }
}
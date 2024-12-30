// pages/api/appointments/[id].js
import mysql from 'mysql2';

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'appointment_system',
});

export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;

  if (method === 'DELETE') {
    try {
      const result = await new Promise((resolve, reject) => {
        db.query(
          'DELETE FROM appointments WHERE id = ?',
          [id],
          (error, results) => {
            if (error) {
              reject(error);
            } else {
              resolve(results);
            }
          }
        );
      });

      if (result.affectedRows > 0) {
        return res.status(200).json({ message: 'Appointment deleted successfully' });
      } else {
        return res.status(404).json({ message: 'Appointment not found' });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error deleting appointment' });
    }
  } else if (method === 'PUT') {
    const { fullName, email, phone, disease, doctor, date, time, message } = req.body;

    try {
      const result = await new Promise((resolve, reject) => {
        db.query(
          'UPDATE appointments SET full_name = ?, email = ?, phone_number = ?, disease = ?, appointment_date = ?, appointment_time = ?, message = ? WHERE id = ?',
          [fullName, email, phone, disease, doctor, date, time, message, id],
          (error, results) => {
            if (error) {
              reject(error);
            } else {
              resolve(results);
            }
          }
        );
      });

      return res.status(200).json({ message: 'Appointment updated successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error updating appointment' });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}


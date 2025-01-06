import mysql from 'mysql2/promise';
import jwt from 'jsonwebtoken';

const appointmentDb = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "doctors_appointment",
});

const doctorDb = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "doctor_registration",
});

// Define your secret key here
const SECRET_KEY = 'your_secret_key';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'Token is required' });
    }

    try {
      const decoded = jwt.verify(token, SECRET_KEY);
      const email = decoded.email;

      // Fetch appointments based on the user's email
      const [appointments] = await appointmentDb.execute(
        'SELECT * FROM appointments WHERE email = ?',
        [email]
      );

      const appointmentsWithDoctorDetails = await Promise.all(appointments.map(async (appointment) => {
        try {
          // Fetch doctor's details from the doctor_registration database
          const [doctor] = await doctorDb.execute(
            'SELECT fullName, email, phoneNumber FROM doctors WHERE id = ?',
            [appointment.doctor]
          );
          return {
            ...appointment,
            doctorName: doctor[0]?.fullName || 'Unknown',
            doctorEmail: doctor[0]?.email || 'Unknown',
            doctorphonenumber: doctor[0]?.phoneNumber || '+977 98********',
            appointment_date: appointment.appointment_date,
            appointment_time: appointment.appointment_time,
          };
        } catch (error) {
          console.error('Error fetching doctor details:', error);
          return {
            ...appointment,
            doctorName: 'Unknown',
            doctorEmail: 'Unknown',
            appointment_date: appointment.appointment_date,
            appointment_time: appointment.appointment_time,
          };
        }
      }));

      res.status(200).json({ appointments: appointmentsWithDoctorDetails });
    } catch (error) {
      console.error('Token verification error:', error);
      return res.status(403).json({ error: 'Invalid token or token has expired' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
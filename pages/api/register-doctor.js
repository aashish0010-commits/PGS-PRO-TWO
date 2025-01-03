
import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs'; // For password hashing

const db = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'doctor_registration',
});
db.connect();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const {
      fullName,
      address,
      email,
      phoneNumber,
      nmcNumber,
      citizenshipNumber,
      speciality,
      password,
    } = req.body;

    try {
      // Check if doctor already exists by email
      const [rows] = await db.execute('SELECT * FROM doctors WHERE email = ?', [email]);

      if (rows.length > 0) {
        return res.status(400).json({ error: 'Doctor with this email already exists' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert the doctor into the database
      await db.execute(
        'INSERT INTO doctors (fullName, address, email, phoneNumber, nmcNumber, citizenshipNumber, speciality, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [
          fullName,
          address,
          email,
          phoneNumber,
          nmcNumber,
          citizenshipNumber,
          speciality,
          hashedPassword,
        ]
      );

      res.status(201).json({ message: 'Doctor registered successfully!' });
    } catch (error) {
      console.error('Database Error:', error);
      res.status(500).json({ error: 'Error registering doctor' });
    }
  } else if (req.method === 'GET') {
    try {
      // Fetch all doctors from the database
      const [rows] = await db.execute('SELECT id, fullName FROM doctors');
      res.status(200).json({ doctors: rows });
    } catch (error) {
      console.error('Database Error:', error);
      res.status(500).json({ error: 'Error fetching doctors' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}

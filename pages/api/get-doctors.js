import mysql from 'mysql2/promise';

const db = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'doctor_registration',
});
db.connect();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const [rows] = await db.execute('SELECT id, fullName FROM doctors');
      res.status(200).json(rows); 
    } catch (error) {
      console.error('Database Error:', error);
      res.status(500).json({ error: 'Error fetching doctors' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}

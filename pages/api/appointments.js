import mysql from "mysql2/promise"; // Using promise-based API for better async handling
import nodemailer from "nodemailer";

// Create database connections
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

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "smartcareconnects@gmail.com",
    pass: "uwgq dhjs hdyc zhsj", // Replace with your app password
  },
});

export default async function handler(req, res) {
  if (req.method === "POST") {
    const {
      fullName,
      email,
      phone,
      countryCode,
      disease,
      doctor,
      date,
      time,
      message,
    } = req.body;

    // Validate required fields
    if (
      !fullName ||
      !email ||
      !phone ||
      !countryCode ||
      !disease ||
      !doctor ||
      !date ||
      !time ||
      !message
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    try {
      // Fetch doctor's full name and email
      const [doctorInfo] = await doctorDb.execute(
        "SELECT fullName, email FROM doctors WHERE id = ?",
        [doctor]
      );

      if (doctorInfo.length === 0) {
        return res
          .status(404)
          .json({ message: "Doctor not found in doctor_registration database." });
      }

      const doctorFullName = doctorInfo[0].fullName;
      const doctorEmail = doctorInfo[0].email;

      // Insert appointment into the appointments table
      const [result] = await appointmentDb.execute(
        "INSERT INTO appointments (full_name, email, phone_number, country_code, disease, doctor, appointment_date, appointment_time, message) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
          fullName,
          email,
          phone,
          countryCode,
          disease,
          doctor,
          date,
          time,
          message,
        ]
      );

      // Send confirmation email to patient
      const mailOptionsPatient = {
        from: "smartcareconnects@gmail.com",
        to: email,
        subject: "Appointment Confirmation with Smart Care Connect",
        text: `
Dear ${fullName},

We are delighted to confirm your appointment with Smart Care Connect. Thank you for entrusting us with your healthcare needs. Below are the details of your appointment:

APPOINTMEMT DETAILS:
- Doctor: ${doctorFullName}
- Condition/Disease: ${disease}
- Date: ${date}
- Time: ${time}

Your Message:
${message}

Please ensure you arrive 10 minutes prior to your scheduled appointment to complete any necessary formalities. If you need to reschedule or cancel, feel free to contact us at least 24 hours in advance to make the necessary adjustments.

We look forward to assisting you and ensuring you receive the highest standard of care. If you have any questions or require further assistance, do not hesitate to reach out to our support team at [smartcarehelp@gmail.com] or call us at +977-9869100969.

Thank you for choosing Smart Care Connect. Together, we aim to make your healthcare journey smooth and stress-free.

Best regards,  
Smart Care Connect Team  
Your Trusted Partner in Health
`,
      };
      await transporter.sendMail(mailOptionsPatient);

      // Send email notification to doctor
      const mailOptionsDoctor = {
        from: "smartcareconnects@gmail.com",
        to: doctorEmail,
        subject: "New Appointment Notification - Smart Care Connect",
        text: `Dear Dr. ${doctorFullName},

We hope this email finds you well. We are pleased to inform you that a new appointment has been successfully booked with you through Smart Care Connect. Below are the details of the appointment:

PATIENT INFORMATION:
- Name: ${fullName}
- Condition/Disease: ${disease}

APPOINTMENT DETAILS:
- Date: ${date}
- Time: ${time}

Additional Message from the Patient:
"${message}"

Please ensure to review the patient's information and be prepared for the consultation. If you require any changes or have questions regarding this appointment, feel free to contact our support team at smartcareconnects@gmail.com.

Thank you for your continued dedication to providing exceptional care to our patients. We look forward to assisting you in delivering the best healthcare experience.

Best regards,  
Smart Care Connect Team  
Your Trusted Partner in Health  
Contact us at: +1-800-555-1234  
Website: [www.smartcareconnect.com](http://www.smartcareconnect.com)
`,
      };
      await transporter.sendMail(mailOptionsDoctor);

      // Respond with success
      res
        .status(200)
        .json({ message: "Appointment booked successfully and emails sent!" });
    } catch (error) {
      console.error("Error in booking appointment:", error);
      res
        .status(500)
        .json({ message: "Failed to book appointment", error: error.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}

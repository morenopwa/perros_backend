const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json());

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false
  }
});

app.post('/send-email', (req, res) => {
  const data = req.body;
  console.log("Datos recibidos:", data);

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'Perros17peru@gmail.com',
    subject: `Nueva Solicitud Hangaround: ${data.fullName}`,
    text: `Detalles:
    - Nombre: ${data.fullName}
    - Email: ${data.email}
    - WhatsApp: ${data.phone}`
    // Puedes agregar el resto de campos aquí siguiendo el mismo formato
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error en Nodemailer:", error);
      return res.status(500).json({ success: false, message: error.message });
    }
    console.log("Email enviado:", info.response);
    res.status(200).json({ success: true, message: "Enviado correctamente" });
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
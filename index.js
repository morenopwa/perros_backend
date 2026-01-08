const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors({
  origin: '*', // Esto permite que cualquier origen (como tu localhost o la web final) se conecte
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json());

// Configuración del transporte de Mail
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true para puerto 465, false para otros puertos
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    // Esto ayuda a evitar errores de conexión en servidores como Render
    rejectUnauthorized: false
  }
});

// Ruta para recibir el formulario
app.post('/send-email', (req, res) => {
  const data = req.body;
  
  // RASTREO 1: ¿Llegaron los datos al servidor?
  console.log("==> Intento de envío recibido para:", data.email);

  const mailOptions = { ... };

  // RASTREO 2: ¿Nodemailer está intentando conectar?
  console.log("==> Iniciando conexión con Gmail...");

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      // RASTREO 3: ¿Por qué falló Gmail?
      console.error("==> FALLO EN NODEMAILER:", error.message);
      return res.status(500).json({ success: false, error: error.message });
    }
    // RASTREO 4: ¡Éxito!
    console.log("==> ¡ÉXITO! Respuesta de Gmail:", info.response);
    res.status(200).json({ success: true });
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en el puerto ${PORT}`);
});
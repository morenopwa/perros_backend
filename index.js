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

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'Perros17peru@gmail.com',
    subject: `Nueva Solicitud Hangaround: ${data.fullName}`,
    text: `Detalles del aspirante:
    - Nombre: ${data.fullName}
    - Apodo: ${data.nickname}
    - Edad: ${data.age}
    - Email: ${data.email}
    - WhatsApp: ${data.phone}
    - Ubicación: ${data.city}, ${data.country}
    - Moto: ${data.bikeModel} (${data.bikeCc}cc)
    - Otro grupo: ${data.otherGroup} (${data.otherGroupDetail})
    - Redes: ${data.socialMedia}`
  };

  // --- ESTA ES LA PARTE QUE FALTABA ---
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error de Nodemailer:", error);
      return res.status(500).json({ 
        success: false, 
        message: 'Error al enviar el correo',
        error: error.message 
      });
    }
    console.log('Email enviado con éxito: ' + info.response);
    res.status(200).json({ 
      success: true, 
      message: '¡Formulario enviado correctamente!' 
    });
  });
  // -------------------------------------
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en el puerto ${PORT}`);
});
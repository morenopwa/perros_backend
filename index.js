const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Configuración del transporte de Mail (Usando tus variables del .env)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // La contraseña de 16 letras
  },
});

// Ruta para recibir el formulario
app.post('/send-email', (req, res) => {
  const { name, email, message } = req.body;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'Perros17peru@gmail.com', // El destino final
    subject: `Nuevo mensaje de ${name}`,
    text: `Has recibido un nuevo mensaje desde la web:\n\nNombre: ${name}\nCorreo: ${email}\nMensaje: ${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.status(500).send({ message: 'Error al enviar el correo' });
    }
    console.log('Email enviado: ' + info.response);
    res.status(200).send({ message: '¡Correo enviado con éxito!' });
  });
});

app.post('/send-email', (req, res) => {
  const data = req.body; // Recibe todo el objeto formData

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
  // ... resto del código de transporter.sendMail
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en el puerto ${PORT}`);
});
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Resend } from "resend";

dotenv.config();

const app = express();

// 🔐 Inicializar Resend con la API KEY del .env
const resend = new Resend(process.env.RESEND_API_KEY);

// 🧱 Middlewares
app.use(cors());
app.use(express.json());

// ✅ Ruta de prueba
app.get("/", (req, res) => {
  res.send("🐺 PERROS MG backend activo");
});

// 📩 Envío de formulario Hangaround
app.post("/api/hangaround", async (req, res) => {
  const d = req.body;

  console.log("📥 Datos recibidos:", d);

  try {
    await resend.emails.send({
      from: "PERROS MG <onboarding@resend.dev>",
      to: ["Perros17peru@gmail.com"],
      subject: "🐺 Nuevo Hangaround 17MG",
      html: `
        <h2>🐕 Nuevo registro Hangaround</h2>
        <hr />
        <p><b>Nombre:</b> ${d.nombre}</p>
        <p><b>Edad:</b> ${d.edad}</p>
        <p><b>Apodo:</b> ${d.apodo || "—"}</p>
        <p><b>Email:</b> ${d.email}</p>
        <p><b>Celular:</b> ${d.celular}</p>
        <p><b>Moto:</b> ${d.moto || "—"} (${d.cc || "—"} cc)</p>
        <br />
        <small>Formulario enviado desde la web PERROS MG</small>
      `,
    });

    res.json({ ok: true });
  } catch (error) {
    console.error("❌ Error Resend:", error);
    res.status(500).json({
      ok: false,
      error: "No se pudo enviar el correo",
    });
  }
});

// 🚀 Arranque del servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🔥 Backend corriendo en puerto ${PORT}`);
});

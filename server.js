import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Resend } from "resend";

dotenv.config();

const app = express();
const resend = new Resend(process.env.RESEND_API_KEY);

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("🐺 PERROS MG backend activo");
});

// 📩 FORMULARIO HANGAROUND
app.post("/api/hangaround", async (req, res) => {
  const d = req.body;

  try {
    await resend.emails.send({
      from: "PERROS MG <Perros17peru@gmail.com>",
      to: ["Perros17peru@gmail.com"],
      subject: "🐺 Nuevo Hangaround 17MG",
      html: `
        <h2>🐕 Nuevo registro Hangaround</h2>
        <hr/>
        <p><b>Nombre:</b> ${d.nombre}</p>
        <p><b>Edad:</b> ${d.edad}</p>
        <p><b>Apodo:</b> ${d.apodo || "—"}</p>
        <p><b>Email:</b> ${d.email}</p>
        <p><b>Celular:</b> ${d.celular}</p>
        <p><b>País:</b> ${d.pais}</p>
        <p><b>Ciudad:</b> ${d.ciudad}</p>
        <p><b>Moto:</b> ${d.moto}</p>
        <p><b>Cilindrada:</b> ${d.cc} cc</p>
        <p><b>Otro MG:</b> ${d.otroMG ? "Sí" : "No"}</p>
        <p><b>Redes:</b> ${d.redes || "—"}</p>
        <br/>
        <small>Formulario enviado desde la web PERROS MG</small>
      `,
    });

    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false });
  }
});

// Arranque
const PORT = process.env.PORT || 3001;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🔥 Backend corriendo en puerto ${PORT}`);
});

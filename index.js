import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Resend } from "resend";

dotenv.config();

if (!process.env.RESEND_API_KEY) {
  console.error("❌ RESEND_API_KEY no está definida");
  process.exit(1);
}

const app = express();
const resend = new Resend(process.env.RESEND_API_KEY);

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("🐺 PERROS MG backend activo");
});

app.post("/api/hangaround", async (req, res) => {
  const d = req.body;

  try {
    await resend.emails.send({
      from: "PERROS MG <Perros17peru@gmail.com>",
      to: ["Perros17peru@gmail.com"],
      subject: "🐺 Nuevo Hangaround 17MG",
      html: `
        <h2>Nuevo registro Hangaround</h2>
        <p><b>Nombre:</b> ${d.nombre}</p>
        <p><b>Edad:</b> ${d.edad}</p>
        <p><b>Email:</b> ${d.email}</p>
        <p><b>Celular:</b> ${d.celular}</p>
        <p><b>Moto:</b> ${d.moto}</p>
        <p><b>Cilindrada:</b> ${d.cc}</p>
        <p><b>País:</b> ${d.pais}</p>
        <p><b>Ciudad:</b> ${d.ciudad}</p>
        <p><b>Redes:</b> ${d.redes}</p>
      `,
    });

    res.json({ ok: true });
  } catch (err) {
    console.error("❌ Error enviando mail:", err);
    res.status(500).json({ ok: false });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🔥 Backend corriendo en puerto ${PORT}`);
});

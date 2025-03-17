const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();

require("dotenv").config(); // Učitaj .env fajl

// SMTP konfiguracija za Gmail
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Tvoj Gmail nalog
    pass: process.env.EMAIL_PASS, // Tvoj App Password
  },
});

router.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res
      .status(400)
      .json({ success: false, message: "Sva polja su obavezna." });
  }

  try {
    // Opcije za email
    const mailOptions = {
      from: email, // Email korisnika koji šalje poruku
      to: process.env.EMAIL_USER, // Tvoj email na koji ćeš primati poruke
      subject: `Kontakt forma - poruka od ${name}`,
      text: `Ime: ${name}\nEmail: ${email}\nPoruka:\n${message}`,
    };

    // Slanje emaila
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: "Poruka je uspešno poslata!" });
  } catch (error) {
    console.error("Greška pri slanju email-a:", error);
    res
      .status(500)
      .json({ success: false, message: "Greška pri slanju poruke." });
  }
});

module.exports = router;

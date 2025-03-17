const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();

require("dotenv").config(); // Učitaj .env fajl

router.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res
      .status(400)
      .json({ success: false, message: "Sva polja su obavezna." });
  }

  try {
    let transporter = nodemailer.createTransport({
      service: "gmail", // Možeš koristiti i drugi email provajder
      auth: {
        user: process.env.EMAIL_USER, // Proveri da li je ovo pravilno postavljeno u .env
        pass: process.env.EMAIL_PASS, // Proveri da li je ovo pravilno postavljeno u .env
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_RECEIVER, // Tvoj e-mail gde će stizati poruke
      subject: `Poruka sa kontakt forme od ${name}`,
      text: `Ime: ${name}\nEmail: ${email}\nPoruka: ${message}`,
    });

    res.json({ success: true, message: "Poruka je uspešno poslata." });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Greška pri slanju poruke." });
  }
});

module.exports = router;

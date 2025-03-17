const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// Ispravljena CORS konfiguracija
app.use(
  cors({
    origin: (origin, callback) => {
      // Dozvoli zahteve sa frontenda (sa ili bez kose crte)
      const allowedOrigins = [
        "https://izmedju-korica-frontend.vercel.app",
        "https://izmedju-korica-frontend.vercel.app/", // Dodaj i ovu opciju za svaki slučaj
        "http://localhost:3000", // Za lokalni razvoj
      ];

      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true); // Dozvoli zahtev
      } else {
        callback(new Error("Nije dozvoljen pristup sa ovog origin-a")); // Blokiraj zahtev
      }
    },
    credentials: true, // Ako koristiš kolačiće ili autentikaciju
  })
);

app.use(express.json());

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const bookRoutes = require("./routes/bookRoutes");
app.use("/api/books", bookRoutes);

const contactRoutes = require("./routes/contactRoutes");
app.use("/api", contactRoutes);

app.get("/", (req, res) => {
  return res.status(200).json({ message: "API is running" });
});

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.log(err));


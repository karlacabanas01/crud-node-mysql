const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");

app.get("/api", (req, res) => {
  res.sendStatus(200); // Solo devuelve un "OK" sin contenido
});

app.use((req, res, next) => {
  console.log(`Solicitud recibida: ${req.method} ${req.url}`);
  next();
});

app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes); // ✅ Montar las rutas en "/api/auth"

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

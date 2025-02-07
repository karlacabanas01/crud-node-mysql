const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(403).json({ message: "Token no proporcionado" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log("Error al verificar el token:", err); // Agrega este log para ver detalles
      return res.status(401).json({ message: "Token inválido" });
    }
    req.userId = decoded.id;
    next();
  });
};

module.exports = verifyToken;

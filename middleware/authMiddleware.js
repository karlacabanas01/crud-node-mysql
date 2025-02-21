const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ error: "Acceso no autorizado - Token no proporcionado" });
  }

  try {
    const decoded = jwt.verify(token, "tu_secreto_jwt");
    console.log("🔍 Usuario decodificado:", decoded); // 👀 Verifica si se obtiene el user_id
    req.user = decoded; // Asigna el usuario al request

    if (!req.user.id) {
      return res
        .status(403)
        .json({ error: "Token inválido - No contiene user_id" });
    }

    next();
  } catch (error) {
    console.error("Error en autenticación:", error);
    res.status(403).json({ error: "Token inválido" });
  }
};

module.exports = { authenticateUser };

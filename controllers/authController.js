const db = require("../config/db");
const jwt = require("jsonwebtoken");

exports.login = (req, res) => {
  const { email, password } = req.body;

  // ✅ Consulta SQL para buscar el usuario en la base de datos
  const query = "SELECT * FROM users WHERE email = ? AND password = ?";

  db.query(query, [email, password], (err, results) => {
    if (err) {
      console.error("Error en la consulta:", err);
      return res.status(500).json({ error: "Error en el servidor" });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    const user = results[0];
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ message: "Inicio de sesión exitoso", token });
  });
};

// ✅ Función para obtener todos los usuarios
exports.getUsers = (req, res) => {
  const query = "SELECT * FROM users";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error al obtener usuarios:", err);
      return res.status(500).json({ error: "Error en el servidor" });
    }
    res.json(results);
  });
};

exports.createUser = (req, res) => {
  const { name, email, password } = req.body;
  const newUser = { id: users.length + 1, name, email, password };
  users.push(newUser);
  res.json(newUser);
};

exports.updateUser = (req, res) => {
  const { id } = req.params;
  const user = users.find((u) => u.id == id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    res.json(user);
  } else {
    res.status(404).json({ error: "Usuario no encontrado" });
  }
};

exports.deleteUser = (req, res) => {
  const { id } = req.params;
  const index = users.findIndex((u) => u.id == id);
  if (index !== -1) {
    users.splice(index, 1);
    res.json({ message: "Usuario eliminado exitosamente" });
  } else {
    res.status(404).json({ error: "Usuario no encontrado" });
  }
};

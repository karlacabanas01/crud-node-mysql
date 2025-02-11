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

  // ✅ Validación básica
  if (!name || !email || !password) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  // 🚨 Verificar si el correo ya está registrado
  const checkEmailQuery = "SELECT * FROM users WHERE email = ?";
  db.query(checkEmailQuery, [email], (err, results) => {
    if (err) {
      console.error("Error al verificar el correo:", err);
      return res.status(500).json({ error: "Error en el servidor" });
    }

    if (results.length > 0) {
      return res.status(409).json({ error: "El correo ya está registrado" });
    }

    // ✅ Insertar el nuevo usuario en la base de datos
    const insertQuery =
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
    db.query(insertQuery, [name, email, password], (err, result) => {
      if (err) {
        console.error("Error al crear el usuario:", err);
        return res.status(500).json({ error: "Error al crear el usuario" });
      }

      const newUser = {
        id: result.insertId,
        name,
        email,
      };

      res.status(201).json(newUser); // ✅ Responder con el nuevo usuario creado
    });
  });
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

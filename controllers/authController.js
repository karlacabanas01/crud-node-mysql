const db = require("../config/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.createUser = async (req, res) => {
  console.log("🔍 Datos recibidos en el backend:", req.body);

  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  // Verificar si el correo ya está registrado
  const checkEmailQuery = "SELECT * FROM users WHERE email = ?";
  db.query(checkEmailQuery, [email], async (err, results) => {
    if (err) {
      console.error("❌ Error al verificar el correo:", err);
      return res.status(500).json({ error: "Error en el servidor" });
    }

    if (results.length > 0) {
      return res.status(409).json({ error: "El correo ya está registrado" });
    }

    try {
      // **🔐 Encriptar la contraseña antes de guardarla**
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log("🔐 Contraseña hasheada:", hashedPassword);

      const insertQuery =
        "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
      db.query(
        insertQuery,
        [username, email, hashedPassword],
        (err, result) => {
          if (err) {
            console.error("❌ Error al crear el usuario en la BD:", err);
            return res.status(500).json({ error: "Error al crear el usuario" });
          }

          console.log("✅ Usuario creado con éxito:", {
            id: result.insertId,
            username,
            email,
          });
          res.status(201).json({ id: result.insertId, username, email });
        }
      );
    } catch (error) {
      console.error("❌ Error al hashear la contraseña:", error);
      return res.status(500).json({ error: "Error al procesar la contraseña" });
    }
  });
};

exports.login = async (req, res) => {
  console.log("Solicitud recibida: POST /api/auth/login");
  console.log("📌 Datos recibidos en el backend:", req.body);

  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ error: "Email y contraseña son obligatorios" });
  }

  const checkUserQuery = "SELECT * FROM users WHERE email = ?";
  db.query(checkUserQuery, [email], async (err, results) => {
    if (err) {
      console.error("❌ Error al buscar el usuario en la BD:", err);
      return res.status(500).json({ error: "Error en el servidor" });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    const user = results[0];

    // **🔑 Comparar la contraseña ingresada con la encriptada en la BD**
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET || "tu_secreto_jwt",
      { expiresIn: "1h" });
    console.log("✅ Usuario autenticado correctamente:", {
      id: user.id,
      email: user.email,
    });

    res.json({
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      token, // ✅ Ahora se devuelve el token
    });
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

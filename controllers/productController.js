const db = require("../config/db");

// ✅ Obtener todos los productos
exports.getProducts = (req, res) => {
  const query = "SELECT * FROM products";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error al obtener productos:", err);
      return res.status(500).json({ error: "Error en el servidor" });
    }
    res.json(results);
  });
};

// ✅ Crear un nuevo producto
exports.createProduct = (req, res) => {
  const { name, description, price } = req.body;
  const query =
    "INSERT INTO products (name, description, price) VALUES (?, ?, ?)";

  db.query(query, [name, description, price], (err, result) => {
    if (err) {
      console.error("Error al crear producto:", err);
      return res.status(500).json({ error: "Error en el servidor" });
    }
    res.status(201).json({ message: "Producto creado exitosamente" });
  });
};

// ✅ Actualizar un producto
exports.updateProduct = (req, res) => {
  const { id } = req.params;
  const { name, description, price } = req.body;
  const query =
    "UPDATE products SET name = ?, description = ?, price = ? WHERE id = ?";

  db.query(query, [name, description, price, id], (err, result) => {
    if (err) {
      console.error("Error al actualizar producto:", err);
      return res.status(500).json({ error: "Error en el servidor" });
    }
    res.json({ message: "Producto actualizado exitosamente" });
  });
};

// ✅ Eliminar un producto
exports.deleteProduct = (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM products WHERE id = ?";

  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("Error al eliminar producto:", err);
      return res.status(500).json({ error: "Error en el servidor" });
    }
    res.json({ message: "Producto eliminado exitosamente" });
  });
};

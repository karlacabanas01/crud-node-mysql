const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// ✅ Ruta para el login
router.post("/login", authController.login);

// Rutas para usuarios
router.get("/users", authController.getUsers);
router.post("/users", authController.createUser);
router.put("/users/:id", authController.updateUser);
router.delete("/users/:id", authController.deleteUser);

module.exports = router;

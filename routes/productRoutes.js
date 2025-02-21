const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const { authenticateUser } = require("../middleware/authMiddleware");

console.log("🔍 Verificando productController:", productController);

router.get("/", authenticateUser, productController.getProducts);
router.post("/", authenticateUser, productController.createProduct);
router.put("/:id", authenticateUser, productController.updateProduct);
router.delete("/:id", authenticateUser, productController.deleteProduct);

module.exports = router;

const express = require("express");
const router = express.Router();
const { addProduct, getAllProducts, getProductById } = require("../controllers/productController");

router.post("/add-product", addProduct);
router.get("/products", getAllProducts);
router.get("/products/:id", getProductById);

module.exports = router;
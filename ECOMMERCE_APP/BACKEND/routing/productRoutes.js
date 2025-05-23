const express = require("express");
const router = express.Router();
const { addProduct, getAllProducts, getProductById, searchProducts} = require("../controllers/productController");

router.post("/add-product", addProduct);
router.get("/products", getAllProducts);
router.get("/products/:id", getProductById);
router.get("/search/products", searchProducts);

module.exports = router;
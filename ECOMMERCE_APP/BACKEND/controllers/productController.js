const Product = require("../model/product");

const addProduct = async (req, res) => {
    try {
        const product = new Product(req.body);
        const savedProduct = await product.save();
        res.status(201).json(savedProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
    }
const getAllProducts = async (req, res) => {
    try {
        const allProducts = await Product.find();
        res.status(200).json(allProducts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
module.exports = {
    addProduct,
    getAllProducts,
    getProductById
}

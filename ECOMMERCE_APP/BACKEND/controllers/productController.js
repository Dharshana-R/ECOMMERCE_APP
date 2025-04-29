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

const searchProducts = async (req, res) => {
    try {
        const filter = {};

        if (req.query.name) {
            filter.name = { $regex: req.query.name, $options: "i" };
        }

        if (req.query.category) {
            filter.category = req.query.category;
        }

        if (req.query.minPrice && req.query.maxPrice) {
            filter.price = {
                $gte: parseFloat(req.query.minPrice),
                $lte: parseFloat(req.query.maxPrice)
            };
        } else if (req.query.minPrice) {
            filter.price = { $gte: parseFloat(req.query.minPrice) };
        } else if (req.query.maxPrice) {
            filter.price = { $lte: parseFloat(req.query.maxPrice) };
        }

        const products = await Product.find(filter);

        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


module.exports = {
    addProduct,
    getAllProducts,
    getProductById,
    searchProducts,
}

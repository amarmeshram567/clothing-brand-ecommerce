const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    images: [String],
    category: String,
    sizes: [String], // [S, M, L, XL]
    stock: { type: Number, default: 0 },
}, { timestamps: true })


const Product = mongoose.model("Product", productSchema);

module.exports = Product
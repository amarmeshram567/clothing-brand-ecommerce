const asyncHandler = require('express-async-handler');
const Product = require('../models/Product');


// get /api/products
const getProducts = asyncHandler(async (req, res) => {
    let { page = 1, limit = 12, search, category, size, minPrice, maxPrice } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    const query = {};

    if (search) {
        query.$or = [
            { name: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } }
        ];
    }

    if (category && category !== "All") {
        query.category = category;
    }

    if (size) {
        query.sizes = size;
    }

    if (minPrice || maxPrice) {
        query.price = {};

        if (minPrice) query.price.$gte = Number(minPrice);
        if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    const total = await Product.countDocuments(query);
    const products = await Product.find(query).skip((page - 1) * limit).limit(limit).lean();

    res.status(200).json({
        products,
        page,
        pages: Math.ceil(total / limit),
        limit,
        total
    });
});


// get /api/products/:id
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);

})


module.exports = {
    getProducts,
    getProductById
}

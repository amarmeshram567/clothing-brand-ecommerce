const asyncHandler = require('express-async-handler');
const Cart = require('../models/Cart');
const Product = require('../models/Product');

// GET /api/cart
const getCart = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const cart = await Cart.findOne({ user: userId }).populate("items.product");

    if (!cart) {
        return res.status(200).json({ items: [] });
    }

    res.status(200).json({
        cart: {
            ...cart._doc,
            items: cart.items.map(item => ({
                ...item._doc,
                quantity: item.qty
            }))
        }
    });
});

// POST /api/cart/add
const addToCart = asyncHandler(async (req, res) => {
    const { productId, size, qty = 1 } = req.body;
    const userId = req.user._id;

    if (!productId) {
        return res.status(400).json({ message: "Product ID is required" });
    }

    const product = await Product.findById(productId);

    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
        cart = await Cart.create({ user: userId, items: [] });
    }

    const existingIndex = cart.items.findIndex(
        (item) =>
            item.product.toString() === productId &&
            ((item.size || "") === (size || ""))
    );

    if (existingIndex > -1) {
        cart.items[existingIndex].qty += Number(qty);
    } else {
        cart.items.push({ product: productId, size, qty });
    }

    await cart.save();
    await cart.populate("items.product");

    res.status(200).json({
        message: "Product added to cart",
        cart: {
            ...cart._doc,
            items: cart.items.map(item => ({
                _id: item._id,
                product: item.product,
                size: item.size,
                quantity: item.qty  // rename here
            }))
        }
    });

});

// PUT /api/cart/update
const updateCartItems = asyncHandler(async (req, res) => {
    const { itemId, qty } = req.body;
    const userId = req.user._id;

    if (!itemId || qty === undefined) {
        return res.status(400).json({ message: "Item ID and quantity are required" });
    }

    const cart = await Cart.findOne({ user: userId });

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.id(itemId);
    if (!item) return res.status(404).json({ message: "Cart item not found" });

    item.qty = Number(qty);

    await cart.save();
    await cart.populate("items.product");

    res.status(200).json({
        message: "Cart updated",
        cart: {
            ...cart._doc,
            items: cart.items.map(item => ({
                ...item._doc,
                quantity: item.qty
            }))
        }
    });

});

// DELETE /api/cart/remove
const removeCartItem = asyncHandler(async (req, res) => {
    const { itemId } = req.params; // URL param
    const userId = req.user._id;

    if (!itemId) return res.status(400).json({ message: "Item ID is required" });

    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    // Remove item using filter
    const initialLength = cart.items.length;
    cart.items = cart.items.filter(item => item._id.toString() !== itemId);
    if (cart.items.length === initialLength) {
        return res.status(404).json({ message: "Item not found in cart" });
    }

    await cart.save();
    await cart.populate("items.product");

    res.status(200).json({
        message: "Item removed from cart",
        cart: {
            ...cart._doc,
            items: cart.items.map(item => ({
                ...item._doc,
                quantity: item.qty
            }))
        }
    });
});




module.exports = {
    getCart,
    addToCart,
    updateCartItems,
    removeCartItem
};

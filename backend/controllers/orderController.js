const asyncHandler = require("express-async-handler");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const Order = require("../models/Order");
const sendOrderEmail = require("../utils/sendEmail");


// post /api/orders
const createOrder = asyncHandler(async (req, res) => {
    const userId = req.user._id
    const { shippingAddress } = req.body;

    if (!shippingAddress || !shippingAddress.full_name || !shippingAddress.street || !shippingAddress.city || !shippingAddress.state || !shippingAddress.zip_code || !shippingAddress.phone) {
        return res.status(400).json({ message: "Shipping address is required" });
    }

    const cart = await Cart.findOne({ user: userId }).populate("items.product");
    if (!cart || cart.items.length === 0) {
        return res.status(400).json({ message: "Cart is empty" });
    }

    // optional stock check & reduce stock
    for (const item of cart.items) {
        const product = await Product.findById(item.product._id);
        if (product.stock !== undefined && product.stock < item.qty) {
            return res.status(400).json({ message: `Product ${product.name} is out of stock` });
        }
    }

    const items = cart.items.map(item => ({
        product: item.product._id,
        name: item.product.name,
        size: item.size,
        qty: item.qty,
        price: item.product.price,
        image: item.product.image ? item.product.image[0] : null
    }));

    const totalPrice = items.reduce((total, item) => total + item.price * item.qty, 0);

    const order = await Order.create({
        user: userId,
        items,
        totalPrice,
        shippingAddress,
        orderDate: new Date(),
        status: 'confirmed'
    });

    // reduce stock 
    for (const item of cart.items) {
        if (typeof item.product.stock === 'number') {
            await Product.findByIdAndUpdate(item.product._id, { $inc: { stock: -item.qty } });
        }
    }

    // clear cart
    cart.items = [];
    await cart.save();

    // send email
    try {
        await sendOrderEmail(order, req.user);
    } catch (error) {
        console.error(error);
    }

    res.status(201).json(order);
})

// get /api/orders/my
const getMyOrders = asyncHandler(async (req, res) => {
    const userId = req.user._id
    const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });

    res.status(200).json(orders);
})


// get /api/orders/:id
const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email').populate('items.product', "name image price");

    if (!order) {
        return res.status(404).json({ message: "Order not found" });
    }

    if (order.user._id.toString() !== req.user._id.toString()) {
        return res.status(401).json({ message: "Forbidden" });
    }

    res.status(200).json(order);
})


module.exports = {
    createOrder,
    getMyOrders,
    getOrderById
}
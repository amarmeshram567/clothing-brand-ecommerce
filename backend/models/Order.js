const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    name: String,
    size: String,
    qty: Number,
    price: Number,
    image: String
});

const shippingAddressSchema = new mongoose.Schema({
    full_name: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip_code: { type: String, required: true },
    phone: { type: String, required: true }
})

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [orderItemSchema],
    totalPrice: { type: Number, required: true },
    orderDate: { type: Date, default: Date.now },
    status: { type: String, enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"], default: "pending" },
    shippingAddress: { type: shippingAddressSchema, required: true },
}, { timestamps: true });


const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
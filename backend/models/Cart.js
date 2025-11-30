const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    size: { type: String },
    qty: { type: Number, required: true },
});

const cartSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [cartItemSchema]
}, { timestamps: true });


const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
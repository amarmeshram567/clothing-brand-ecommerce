const express = require('express');
const { getCart, addToCart, updateCartItems, removeCartItem } = require('../controllers/cartController');
const { protect } = require('../middleware/authMiddleware');

const cartRouter = express.Router();

cartRouter.use(protect)

cartRouter.get('/', getCart);
cartRouter.post('/add', addToCart);
cartRouter.put('/update', updateCartItems);
cartRouter.delete('/remove/:itemId', removeCartItem);


module.exports = cartRouter
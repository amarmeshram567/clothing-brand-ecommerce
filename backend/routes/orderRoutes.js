const express = require('express');
const { getMyOrders, getOrderById, createOrder } = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');

const orderRouter = express.Router();


orderRouter.use(protect);

orderRouter.post('/', createOrder);
orderRouter.get('/my-orders', getMyOrders);
orderRouter.get('/:id', getOrderById);

module.exports = orderRouter
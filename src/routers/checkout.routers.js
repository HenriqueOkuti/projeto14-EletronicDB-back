import express from 'express';
import { getOrder, postOrder } from '../controllers/checkout.controllers.js';
import { verifyCredentials } from '../middlewares/cart.middleware.js';
import { verifyOrders } from '../middlewares/checkout.middleware.js';

const router = express.Router();
router.get('/checkout', verifyCredentials, verifyOrders, getOrder);
router.post('/checkout', verifyCredentials, verifyOrders, postOrder);

export default router;

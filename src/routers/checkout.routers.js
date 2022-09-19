import express from 'express';
import { getOrder, postOrder } from '../controllers/checkout.controllers.js';
import {
  verifyCart,
  verifyCredentials,
} from '../middlewares/cart.middleware.js';
import { verifyOrders } from '../middlewares/checkout.middleware.js';

const router = express.Router();
router.get('/checkout', verifyCredentials, verifyCart, verifyOrders, getOrder);
router.post(
  '/checkout',
  verifyCredentials,
  verifyCart,
  verifyOrders,
  postOrder
);

export default router;

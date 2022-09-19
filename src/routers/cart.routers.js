import express from 'express';
import {
  insertItem,
  sendCart,
  updateCart,
} from '../controllers/cart.controllers.js';
import {
  verifyCredentials,
  verifyCart,
  verifyItem,
  updateItem,
} from '../middlewares/cart.middleware.js';

const router = express.Router();
router.get('/cart', verifyCredentials, verifyItem, sendCart);
router.post(
  '/cart',
  verifyCredentials,
  verifyCart,
  verifyItem,
  updateItem,
  insertItem
);
router.put('/cart', verifyCredentials, verifyCart, updateCart);

export default router;

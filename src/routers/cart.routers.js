import express from 'express';
import {
  insertItem,
  sendCart,
  updateCart,
} from '../controllers/cart.controllers.js';
import {
  verifyCredentials,
  verifyCart,
} from '../middlewares/cart.middleware.js';

const router = express.Router();
router.get('/cart', verifyCredentials, sendCart);
router.post('/cart', verifyCredentials, verifyCart, insertItem);
router.put('/cart', verifyCredentials, verifyCart, updateCart);

export default router;

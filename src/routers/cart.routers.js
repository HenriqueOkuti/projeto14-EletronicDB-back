import express from 'express';
//IMPORT CONTROLLERS
//IMPORT MIDDLEWARES

const router = express.Router();
router.post('/cart', doSomething());
router.get('/cart', doAnotherSomething());

export default router;

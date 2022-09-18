import express from 'express';
//IMPORT CONTROLLERS
//IMPORT MIDDLEWARES

const router = express.Router();
router.get('/mongo', getMongo);

export default router;

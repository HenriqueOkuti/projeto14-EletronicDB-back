import express from 'express';
//IMPORT CONTROLLERS
import { getMongo } from '../controllers/mongo.controllers.js';
//IMPORT MIDDLEWARES

const router = express.Router();
router.get('/mongo', getMongo);

export default router;

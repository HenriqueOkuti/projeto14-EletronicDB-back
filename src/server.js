import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sendDataToDB from './functions/sendDataToDB.js';

import cartRoutes from './routers/cart.routers.js';
import mongoRoutes from './routers/mongo.routers.js';
import authRouter from './routers/auth.routers.js';
import checkoutRouter from './routers/checkout.routers.js';

dotenv.config();
const server = express();
server.use(cors());
server.use(express.json());

//sendDataToDB();

server.use(cartRoutes);
server.use(mongoRoutes);
server.use(authRouter);
server.use(checkoutRouter);

server.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);

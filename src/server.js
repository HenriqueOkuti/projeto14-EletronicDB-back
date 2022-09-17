import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sendDataToDB from './functions/sendDataToDB.js';
import db from './db/db.js';
import { COLLECTIONS } from './enums/collections.js';
import authRouter from './routers/auth.routers.js';

dotenv.config();
const server = express();
server.use(cors());
server.use(express.json());

sendDataToDB();

server.use(authRouter);

server.get('/mongo', async (req, res) => {
  const data = await db.collection(COLLECTIONS.PRODUCTS).find({}).toArray();
  console.log(data);
  res.send(data);
});

server.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sendDataToDB from './functions/sendDataToDB.js';
import db from './db/db.js';
import { COLLECTIONS } from './enums/collections.js';

dotenv.config();
const server = express();
server.use(cors());
server.use(express.json());

sendDataToDB();

server.get('/', (req, res) => {
  res.sendStatus(200);
});

server.get('/mongo', async (req, res) => {
  const data = await db.collection(COLLECTIONS.PRODUCTS).find({}).toArray();
  console.log(data);
  res.send(data);
});

server.get('/test', (req, res) => {
  res.sendStatus(201);
});

server.get('/test2', (req, res) => {
  console.log('Test2 get');
  res.sendStatus(201);
});

server.get('/env', (req, res) => {
  console.log('blank env');
  res.sendStatus(202);
});

server.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);

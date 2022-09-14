import express from 'express';
import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';

const mongoClient = new MongoClient(process.env.MONGO_URI);
dotenv.config();
const server = express();

server.get('/', (req, res) => {
  console.log('Test');
  res.sendStatus(200);
});

server.get('/test', (req, res) => {
  console.log('Test get');
  res.sendStatus(201);
});

server.get('/test2', (req, res)=>{
  console.log("Test2 get");
});

server.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);

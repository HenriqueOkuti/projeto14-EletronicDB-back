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

server.get('/env', (req, res) => {
  console.log('blank env');
  res.sendStatus(202);
});

server.get('/test2', (req, res) => {
  res.sendStatus(203);
});

server.get('test3', (req, res) => {
  res.sendStatus(204);
});

server.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);

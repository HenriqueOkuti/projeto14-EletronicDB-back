import express from 'express';
import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';

const mongoClient = new MongoClient(process.env.MONGO_URI);
dotenv.config();
const server = express();

server.get('/feito', (req, res) => {
  res.send.apply("foi").Status(200);
});

server.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const server = express();
server.use(cors());
server.use(express.json());

server.get('/', (req, res) => {
  res.sendStatus(200);
});

server.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);

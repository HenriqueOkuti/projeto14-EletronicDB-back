import dotenv from 'dotenv';
import { MongoClient, ServerApiVersion } from 'mongodb';

dotenv.config();
let db;

const mongoClient = new MongoClient(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

try {
  await mongoClient.connect();
} catch (error) {
  console.log(error);
}

db = mongoClient.db('eletronicdb');

export default db;

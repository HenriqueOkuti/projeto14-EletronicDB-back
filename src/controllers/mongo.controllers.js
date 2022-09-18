import db from '../db/db.js';
import { COLLECTIONS } from '../enums/collections.js';

async function getMongo(req, res) {
  const data = await db.collection(COLLECTIONS.PRODUCTS).find({}).toArray();
  return res.send(data);
}

export { getMongo };

import db from '../db/db.js';

async function getMongo(req, res) {
  const data = await db.collection(COLLECTIONS.PRODUCTS).find({}).toArray();
  console.log(data);
  return res.send(data);
}

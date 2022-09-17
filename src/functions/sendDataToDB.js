import dataToObj from './dataToObj.js';
import db from '../db/db.js';
import { COLLECTIONS } from '../enums/collections.js';

export default async function sendDataToDB() {
  return
  const DB_DATA = await dataToObj();
  if (DB_DATA) {
    console.log('\nData has been read and is ready to use');
  }
  try {
    const repeatedData = await db
      .collection(COLLECTIONS.PRODUCTS)
      .findOne({ name: DB_DATA[1].name });

    if (!repeatedData) {
      console.log('Repeated DATA');
      console.log('aborting send operations');
      return;
    }

    DB_DATA.forEach((element) => {
      const INSERTED_ELEMENT = db
        .collection(COLLECTIONS.PRODUCTS)
        .insertOne(element);
    });
  } catch (error) {
    console.log(error);
  }
}

import db from '../db/db.js';
import { COLLECTIONS } from '../enums/collections.js';

async function verifyOrders(req, res, next) {
  const { session } = res.locals;
  let orderExists = true;
  try {
    const searchOrders = await db.collection(COLLECTIONS.ORDERS).findOne({
      userId: session.userId,
    });
    if (!searchOrders) {
      orderExists = false;
    }
    res.locals.orderExists = orderExists;
    next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(STATUS_CODE.SERVER_ERROR);
  }
}

export { verifyOrders };

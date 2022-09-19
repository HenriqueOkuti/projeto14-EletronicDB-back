import db from '../db/db.js';
import { COLLECTIONS } from '../enums/collections.js';
import { STATUS_CODE } from '../enums/statusCode.js';

async function postOrder(req, res) {
  const { user, orderExists } = res.locals;
  const cartUser = req.body;
  try {
    if (!orderExists) {
      await db
        .collection(COLLECTIONS.ORDERS)
        .insertOne({ userId: user._id, orders: [{ ...cartUser }] });
    } else {
      const userOrders = await db
        .collection(COLLECTIONS.ORDERS)
        .findOne({ userId: user._id });
      const userOrdersArray = userOrders.orders;
      userOrdersArray.push(cartUser);
      await db
        .collection(COLLECTIONS.ORDERS)
        .updateOne({ userId: user._id }, { $set: { orders: userOrdersArray } });
    }

    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(STATUS_CODE.BAD_REQUEST);
  }
}

async function getOrder(req, res) {
  const { user, orderExists } = res.locals;
  try {
    if (!orderExists) {
      return res.sendStatus(404);
    } else {
      const userOrders = await db
        .collection(COLLECTIONS.ORDERS)
        .find({ userId: user._id })
        .toArray();
      return res.send(userOrders);
    }
  } catch (error) {
    console.log(error);
    return res.sendStatus(STATUS_CODE.BAD_REQUEST);
  }
}

export { postOrder, getOrder };

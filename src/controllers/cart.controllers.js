import db from '../db/db.js';
import { COLLECTIONS } from '../enums/collections.js';
import { STATUS_CODE } from '../enums/statusCode.js';
import findIndex from '../functions/findIndex.js';

async function insertItem(req, res) {
  const { user, cartExists, cartUser, needUpdateValue } = res.locals;
  const newItem = req.body;
  try {
    if (!cartExists) {
      await db.collection(COLLECTIONS.CARTS).insertOne({
        userId: user._id,
        cart: [{ ...newItem }],
      });
    } else {
      if (!needUpdateValue) {
        const userCart = cartUser.cart;
        userCart.push({ ...newItem });
        await db
          .collection(COLLECTIONS.CARTS)
          .updateOne({ userId: user._id }, { $set: { cart: userCart } });
      }
    }
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(STATUS_CODE.BAD_REQUEST);
  }
}

async function sendCart(req, res) {
  const { user } = res.locals;
  try {
    const cartItens = await db
      .collection(COLLECTIONS.CARTS)
      .find({
        userId: user._id,
      })
      .toArray();
    return res.send(cartItens);
  } catch (error) {
    console.log(error);
    return res.sendStatus(STATUS_CODE.BAD_REQUEST);
  }
}

async function updateCart(req, res) {
  const { user, cartUser } = res.locals;
  const updateItems = req.body;

  try {
    const userCart = updateItems;
    const array = [];
    for (let product of userCart) {
      array.push(product);
    }

    await db
      .collection(COLLECTIONS.CARTS)
      .updateOne({ userId: user._id }, { $set: { cart: array } });
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(STATUS_CODE.BAD_REQUEST);
  }
}

export { insertItem, sendCart, updateCart };

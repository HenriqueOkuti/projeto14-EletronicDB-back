import { STATUS_CODE } from '../enums/statusCode.js';
import { COLLECTIONS } from '../enums/collections.js';
import db from '../db/db.js';

async function verifyCredentials(req, res, next) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) {
    return res.sendStatus(STATUS_CODE.BAD_REQUEST);
  }
  try {
    const session = await db.collection(COLLECTIONS.SESSIONS).findOne({
      token,
    });
    if (!session) {
      return res.sendStatus(STATUS_CODE.UNAUTHORIZED);
    }
    const user = await db.collection(COLLECTIONS.USERS).findOne({
      _id: session.userId,
    });
    res.locals.session = session;
    res.locals.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(STATUS_CODE.SERVER_ERROR);
  }
}

async function verifyCart(req, res, next) {
  const { user } = res.locals;
  const newItem = req.body;
  if (!newItem) {
    return res.sendStatus(STATUS_CODE.BAD_REQUEST);
  }
  try {
    const cartUser = await db.collection(COLLECTIONS.CARTS).findOne({
      userId: user._id,
    });
    let cartExists;
    if (!cartUser) {
      cartExists = false;
    } else {
      cartExists = true;
    }
    res.locals.cartExists = cartExists;
    res.locals.cartUser = cartUser;
    res.locals.newItem = newItem;
    next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(STATUS_CODE.SERVER_ERROR);
  }
}

async function verifyItem(req, res, next) {
  const { user, newItem } = res.locals;
  let needUpdateValue = false;
  let indexUpdate = -1;
  try {
    let cartItens = await db
      .collection(COLLECTIONS.CARTS)
      .find({
        userId: user._id,
      })
      .toArray();
    if (cartItens[0] !== undefined) {
      cartItens = cartItens[0].cart;
      for (let i = 0; i < cartItens.length; i++) {
        if (cartItens[i]?.id === newItem?.id) {
          needUpdateValue = true;
          indexUpdate = i;
        }
      }
    }
    res.locals.needUpdateValue = needUpdateValue;
    res.locals.indexUpdate = indexUpdate;
    next();
  } catch (error) {
    console.log(error);
    res.sendStatus(STATUS_CODE.SERVER_ERROR);
  }
}

async function updateItem(req, res, next) {
  const { user, indexUpdate, needUpdateValue } = res.locals;
  try {
    if (needUpdateValue) {
      let cartItens = await db
        .collection(COLLECTIONS.CARTS)
        .find({
          userId: user._id,
        })
        .toArray();
      cartItens[0].cart[indexUpdate].quantity = (
        Number(cartItens[0].cart[indexUpdate].quantity) + 1
      ).toString();
      await db
        .collection(COLLECTIONS.CARTS)
        .updateOne({ userId: user._id }, { $set: { cart: cartItens[0].cart } });
    }

    next();
  } catch (error) {
    console.log(error);
    res.sendStatus(STATUS_CODE.SERVER_ERROR);
  }
}

export { verifyCredentials, verifyCart, verifyItem, updateItem };

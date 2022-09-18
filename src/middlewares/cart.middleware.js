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
    next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(STATUS_CODE.SERVER_ERROR);
  }
}

export { verifyCredentials, verifyCart };

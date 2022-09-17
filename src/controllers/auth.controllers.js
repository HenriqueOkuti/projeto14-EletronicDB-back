import joi from 'joi';
import bcrypt from 'bcrypt'
import {v4 as uuid} from 'uuid';
import db from '../db/db.js';
import { COLLECTIONS } from '../enums/collections.js';

const signupSchema = joi.object({
    name: joi.string().required().min(1),
    email: joi.string().required().email().min(1),
    password: joi.string().required().min(1),
});

const signinSchema = joi.object({
    email: joi.string().required().email().min(1),
    password: joi.string().required().min(1),
});

async function postSignup (req, res) {
    const user = req.body;
    const validation = signupSchema.validate(user);
    if (validation.error){
        res.status(422).send("error");
        return;
    };

    try{
        const users = await db.collection(COLLECTIONS.USERS).find().toArray();
        const passwordHash = bcrypt.hashSync(user.password, 10);

        for (let i = 0; i < users.length; i++){
            if (user.email === users[i].email){
                return res.status(409).send("E-mail already registered");
            };
        };
        const singup = await db.collection(COLLECTIONS.USERS).insertOne({...user, password: passwordHash});
        res.status(201).send("ok");
    } catch {
        res.sendStatus(422);
    };
};

async function postSignin (req,res) {
    const {email, password} = req.body;
    const validation = signinSchema.validate({email, password});
    if (validation.error){
        res.status(422).send("error");
        return;
    };

    try{
        const user = await db.collection(COLLECTIONS.USERS).findOne({email});
        const validatePassword = bcrypt.compareSync(password, user.password);

        if (user && validatePassword){
            const token = uuid();
            await db.collection(COLLECTIONS.SESSIONS).insertOne({
                userId: user._id,
                token
            });
            return res.send({token, name: user.name});
        } else {
            return res.sendStatus(422).send("password invalid");
        };
    } catch {
        res.sendStatus(422);
    };
};

export { postSignup, postSignin };
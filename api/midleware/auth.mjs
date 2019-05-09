import joi from '@hapi/joi';
import jwt from 'jsonwebtoken';
import short from 'short-uuid';
import { users } from '../models/dummyUsers.mjs';
const appSecreteKey = 'hksuua7as77hjvb348b3j2hbrbsc9923k';

export function inputValidator(req, res, next) {
  // joi validation shema
  const schema = {
    firstName: joi.string().min(3).required(),
    lastName: joi.string().min(3).required(),
    adress: joi.string().min(3).required(),
    password: joi.string().min(3).required(),
    email: joi.string().min(3).required(),
  };
  const result = joi.validate(req.body, schema);
  // input validation
  if (result.error) {
    res.status(400).send({ message: result.error.details[0].message });
    return;
  }

  next();
}

export function checkUserExists(req, res, next) {
  const user = users.find(u => u.email === req.body.email);
  if (user) {
    res.status(409).send({ message: `user ${user.email} already exists ` });
    return;
  }
  next();
}

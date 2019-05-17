import joi from '@hapi/joi';
import { users } from '../models/users';
import jwt from 'jsonwebtoken';
const appSecreteKey = 'hksuua7as77hjvb348b3j2hbrbsc9923k';

// validate token
export function ensureToken(req, res, next) {
  let token = req.headers['x-access-token'] || req.headers.authorization;
  if (token.startsWith('Bearer ')) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }
  if (token) {
    jwt.verify(token, appSecreteKey, (err, decoded) => {
      if (err) {
        return res.json({
          error: 403,
          message: 'Token is  Invalid',
        });
      }
      req.decoded = decoded;
      next();
    });
    return true;
  }
  return res.json({
    success: false,
    message: 'Auth token is not supplied',
  });
}

// validate input on sighup
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

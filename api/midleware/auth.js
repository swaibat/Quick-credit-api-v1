import Joi from '@hapi/joi';
import { User } from '../models/users';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
dotenv.config()


// validate token
export function ensureToken(req, res, next) {
  let token = req.headers['x-access-token'] || req.headers.authorization;
  if (token.startsWith('Bearer ')) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }
  if (token) {
    jwt.verify(token, process.env.appSecreteKey, (err, decoded) => {
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
  const schema = Joi.object().keys({
    firstName: Joi.string().min(3).regex(/^[a-zA-Z\-]+$/).required(),
    lastName: Joi.string().min(3).regex(/^[a-zA-Z\-]+$/).required(),
    address: Joi.string().min(3).regex(/^[a-zA-Z\-]+$/).required(),
    password: Joi.string().min(3).regex(/^[a-zA-Z0-9]{3,30}$/),
    email: Joi.string().email({ minDomainSegments: 2 })
});
  const result = Joi.validate(req.body, schema);
  // input validation
  if (result.error) {
    res.status(400).send({ message: result.error.details[0].message });
    return;
  }

  next();
}

export function checkUserExists(req, res, next){
  const user = User.getUserByEmail(req.body.email);
  if (user.rows[0]) {
    res.status(409).send({ message: `user ${user.row[0].email} already exists ` });
    return;
  }
  next();
}


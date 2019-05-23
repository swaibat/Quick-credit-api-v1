import Joi from '@hapi/joi';
import { users, User } from '../models/users';
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
    address: Joi.string().min(3).regex(/^[a-zA-Z0-9]+$/).required(),
    password: Joi.string().min(3).regex(/^[a-zA-Z0-9]{3,30}$/).required(),
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
});
  const result = Joi.validate(req.body, schema);
  // input validation

  if (result.error) {
    const errMsg = result.error.details[0].message
    if (errMsg.match('pattern')){
      return res.status(400).send({ error:404,message: 'Ooops try to insert in a valid character' })
    }
    return res.status(400).send({ message: `${errMsg}` });
  }

  next();
}

export const  checkUserExists = async (req, res, next) =>{
  const user = await User.getUserByEmail(req.body.email);
  if (user && user.rows[0]) {
    return res.status(409).send({ message: `user ${user.rows[0].email} already exists ` });``  
  }
  next();
};


import jwtDecode from 'jwt-decode';
import jwt from 'jsonwebtoken';
import short from 'short-uuid';
import { users } from '../models/dummyUsers.mjs';
const appSecreteKey = 'hksuua7as77hjvb348b3j2hbrbsc9923k';
// Mark a client as verified.
export function adminCheck(req, res, next) {
  // check if user is admin
  const token = req.headers.authorization;
  const decoded = jwtDecode(token);
  const admin = users.find(u => u.email === decoded.email);
  if (!admin || admin.isAdmin === false) {
    res.status(403).send({ error: 403, message: 'Forbidden' });
    return;
  }
  next();
}

export function postData(req, res) {
  // token const
  const token = jwt.sign({ email: req.body.email }, appSecreteKey, { expiresIn: '1hr' });
  const user = {
    id: short.generate(),
    token,
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.password,
    adress: req.body.adress,
    isAdmin: false,
  };
  users.push(user);
  res.status(201).send(user);
}

// sigin  midlaware
export function postSignin(req, res) {
  // token const
  const token = jwt.sign({ email: req.body.email }, appSecreteKey, { expiresIn: '1hr' });
  // check for the details existance
  const user = users.find(u => u.email === req.body.email);
  if (!user || user.password !== req.body.password) {
    res.status(401).send({ message: 'Auth failed,invalid details' });
    return;
  }
  user.token = token;
  res.status(200).send(user);
}
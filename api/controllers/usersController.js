import jwt from 'jsonwebtoken';
import { users } from '../models/users';
const appSecreteKey = 'hksuua7as77hjvb348b3j2hbrbsc9923k';

export class User {
  postData(req, res) {
    // token const
    const token = jwt.sign({ email: req.body.email }, appSecreteKey, { expiresIn: '1hr' });
    const user = {
      id: Math.random().toString(35).slice(2),
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

  // sigin
  postSignin(req, res) {
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
}

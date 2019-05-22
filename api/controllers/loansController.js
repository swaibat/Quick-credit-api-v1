import jwt from 'jsonwebtoken';
import { users } from '../models/users';
import {pool} from '../services/db';

const appSecreteKey = 'hksuua7as77hjvb348b3j2hbrbsc9923k';
export class User {
  postData(req, res) {
    // token const
    const token = jwt.sign({ email: req.body.email }, appSecreteKey, { expiresIn: '1hr' });

    const {firstName,lastName,email,address,password} = req.body;

    pool.connect((err, client, done) => {
      const query = 'INSERT INTO users(firstName,lastName,email,address,password) VALUES($1,$2,$3,$4,$5) RETURNING *';
      const values = [firstName,lastName,email,address,password];
  
      client.query(query, values, (error, result) => {
        done();
        if (error) {
          res.status(400).json({error});
        }
        res.status(201).send({
          status: '201',
          result: result.rows[0],
        });
      });
    });
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

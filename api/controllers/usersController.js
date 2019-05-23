import jwt from 'jsonwebtoken';
import { User } from '../models/users';
import bcrypt from'bcrypt';
import dotenv from 'dotenv';

dotenv.config()



export class UserController {

  async signUp(req, res) {
  const {firstName,lastName,email,address,password} = req.body;
   
    if(firstName && lastName && email && address &&password){
      const userObj = new User(firstName,lastName,email,address,password);
      
      const user = await userObj.createUser();
      const token = jwt.sign({ email: req.body.email }, process.env.appSecreteKey, { expiresIn: '1hr' });
      res.status(201).send({
        status:"201",
        user: {
          id : user.rows[0].id,
          firstName : user.rows[0].firstName,
          lastName : user.rows[0].lastName,
          email : user.rows[0].email,
          address : user.rows[0].address,
          isAdmin : user.rows[0].isAdmin,
          token
        }
      })
    }
    return;
  }
}

import jwt from 'jsonwebtoken';
import { User } from '../models/users';
import dotenv from 'dotenv'

dotenv.config()


export class UserController {
  
  async postData(req, res) {
    
    const {firstName,lastName,email,address,password} = req.body;
    
    const userObj = new User(firstName,lastName,email,address,password)
    try{
      const user = await userObj.createUser();
      const token = jwt.sign({ email: req.body.email },process.env.appSecreteKey, { expiresIn: '1hr' });
      res.status(201).send({
        status:"201",
        user: user.rows[0],
        token
      })
    }catch(error){
      res.status(400).send({error})
    }
  
  }
}

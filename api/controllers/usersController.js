import jwt from 'jsonwebtoken';
import { User } from '../models/users';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config()

export class UserController {

 

  async signUp(req, res) {
    
    const {firstName,lastName,email,address,password} = req.body;
    const hashPassword = bcrypt.hashSync(password, 10);
    const userObj = new User(firstName,lastName,email,address,hashPassword);
    try{
      const user = await userObj.createUser();
      const token = jwt.sign({ email: req.body.email,id: req.body.id,isAdmin: req.body.isAdmin },process.env.appSecreteKey, { expiresIn: '1hr' });
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
        },
      })
    }catch(error){
      res.status(400).send({error})
    }
  
  }

  // sigin
  async signin(req, res) {

    const {email,password} = req.body;
    // check if a user with the given email exist.
  
      const user = await User.getUserByEmail(email);
      const passCompare = bcrypt.compareSync(password,user.row[0].password);
      if(passCompare){
        const token = jwt.sign({ email: req.body.email }, process.env.appSecreteKey, { expiresIn: '1hr' });
        res.status(200).send({
          status: "200",
          message: "You have signed in successfully",
          token
        })
      }
      res.status(401).send({status: "401", "message": "wrong username or password"})
    
  }
}

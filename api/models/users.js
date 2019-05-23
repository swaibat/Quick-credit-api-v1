import { pool } from "../services/db";

export class User{
  constructor(firstName,lastName,email,address,password){
    this.firstName = firstName;
    this.lastName =lastName;
    this.email = email;
    this.address = address;
    this.password = password;

  }

  createUser(userObj){
    const {firstName,lastName,email,address,password} = userObj
    const userQuery = 'INSERT INTO users(firstName,lastName,email,address,password) VALUES($1,$2,$3,$4,$5) RETURNING *';
    const values = [firstName,lastName,email,address,password];
    
    return pool.query(userQuery, values) //returns a promise
  }

  static getUserByEmail(email){
    const query = `SELECT * FROM users WHERE email='${email}'`
    return pool.query(query)
  }
  
}
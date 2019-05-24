import { pool } from "../services/db";

export class User{
  constructor(firstName,lastName,email,address,password){
    this.firstName = firstName;
    this.lastName =lastName;
    this.email = email;
    this.address = address;
    this.password = password;

  }

  createUser(){
    const userQuery = 'INSERT INTO users(firstName,lastName,email,address,password) VALUES($1,$2,$3,$4,$5) RETURNING *';
    const values = [this.firstName,this.lastName,this.email,this.address,this.password];

    return pool.query(userQuery, values) //returns a promise
  }

  static getUserByEmail(email){
    const query = 'SELECT * FROM users WHERE email=$1'
    const values =[email]
    return pool.query(query, values)
  }

  static verifyUser(email){
    const query = 'UPDATE users SET status=$1 WHERE email=$2'
    const variables = ['verified', email]
    return pool.query(query,variables) 
}
  
}

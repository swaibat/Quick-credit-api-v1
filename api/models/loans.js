import { pool } from '../services/db';

export class Loan{

  //gets  loans for a specific user.
  getLoanByUser(userEmail){
   
    const userQuery = 'SELECT * FROM loans WHERE useremail=$1'  
    const values = [userEmail];
    return pool.query(userQuery, values)
  }


  addLoan(loanObj, res){
    const {createdOn, tenor, amount, repaid, paymentInstallment, balance, interest, user, status } =loanObj
  
      const query = 'INSERT INTO loans(createdOn, tenor, amount, repaid, paymentInstallment, balance, interest, useremail, status) VALUES($1,$2,$3,$4,$5,$6,$7, $8, $9) RETURNING *';
      const values = [createdOn, tenor, amount, repaid, paymentInstallment, balance, interest, user, status];

      return pool.query(query, values);    // this returns a promise 
  }


  getAllLoans(){
    const loansQuery = 'SELECT * FROM loans'; 
    return pool.query(loansQuery)  // this returns a promise
  }

  getSingleLoan(id){
    const IdQuery = 'SELECT * FROM loans WHERE id=$1'
    const value = [id];
    return pool.query(IdQuery,value ) // this returns a promise
  }

  getLoanStatus(status, repaid){
      const query = 'SELECT * FROM loans WHERE status=$1 AND repaid= $2'
      const variables = [status, repaid]
      return pool.query(query,variables) 
  }

  updateLoanStatus(status, id){
    const query = 'UPDATE loans SET status=$1 WHERE id=$2'
    const variables = [status, id]
    return pool.query(query,variables) 
  }

}



import {  Loan } from '../models/loans';
import { getUserFromToken } from './usersWare';


const loanObj = new Loan()
// apply for loan
export const appliedCheck = async (req, res, next) => {
  const userEmail = getUserFromToken(req, res)
  //wait for the promise to resolve
  const loan = await loanObj.getLoanByUser(userEmail);
  
  if (loan.rows.length > 0) {
    res.status(409).send({ message: 'You already applied for a loan. you can request for ​only​ one loan at a time ' });
    return;
  }
  next();
}


export function query(req, res, next) {
  const loanStatus = loans.filter(loan => {
    return loan.status === req.query.status && loan.repaid === JSON.parse(req.query.repaid)});
  if (typeof req.query.status !== 'undefined' && typeof req.query.status !== 'undefined') {
    if (loanStatus) {
        res.send(loanStatus);
    }
    return;
  }
  next();
}

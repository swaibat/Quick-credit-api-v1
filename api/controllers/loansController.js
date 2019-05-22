import timeago from 'timeago.js';
import { loans, repayments } from '../models/loans';
import {pool} from '../services/db';

export class Loan {
  postLoan(req, res) {

    const {amount,tenor} = req.body,
        paymentInstallment = parseFloat(amount / tenor),
        balance = parseFloat(amount + (5 / 100) * amount),
        interest = parseFloat((5 / 100) * amount);

    pool.connect((err, client, done) => {
      const query = 'INSERT INTO loans(tenor,amount, paymentInstallment, balance,interest) VALUES($1,$2,$3,$4,$5) RETURNING *';
      const values = [tenor, amount, paymentInstallment,balance,interest];
  
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

  // View loan repayment history
  LoanRepayments(req, res) {
    const loanHistory = repayments.filter(a => a.id === req.params.loanId);
    if (!loanHistory || loanHistory.length < 1) {
      res.status(404).send({ message: 'No loan repayment history found' });
      return;
    }
    loanHistory.forEach((loan) => {
      loan.createdOn = timeago.format(loan.createdOn);
    });
    res.send(loanHistory);
  }

  // View loan repayment history
  viewLoans(req, res) {
    pool.connect((err, client, done) => {
      const query = 'SELECT * FROM loans';
      client.query(query, (error, result) => {
        done();
        if (error) {
          res.status(400).json({error})
        } 
        if(result.rows < '1') {
          res.status(404).send({
          status: 'Failed',
          message: 'No student information found',
          });
        } else {
          res.status(201).send({
          status: '200',
          loans: result.rows,
          });
        }
      });
    });
  }
  // View a specific loan
  viewSpecific(req, res) {
    pool.connect((err, client, done) => {
      const query = "SELECT * FROM loans WHERE id = $1;";
      client.query(query, (error, result) => {
        done();
        if (error) {
          res.status(400).json({error})
        } 
        if(result.rows < '1') {
          res.status(404).send({
          status: 'Failed',
          message: 'No student information found',
          });
        } else {
          res.status(201).send(rows[0])
        }
      });
    });
  }

  // approve a loan application
  approveLoan(req, res) {
    const loan = loans.find(a => a.id === req.params.loanId);
    loan.status = 'approved';
    res.status(200).send(loan);
  }
  
  // reject a loan application
  rejectLoan(req, res) {
    const loan = loans.find(a => a.id === req.params.loanId);
    loan.status = 'rejected';
    res.status(200).send(loan);
  }
}

// approveLoan(req, res) {
//   const loan = loans.find(a => a.id === req.params.loanId);
//   if (req.params.status == 'approve'){
//     loan.status = 'approved';
//     res.status(200).send(loan);
//   } else if(req.params.status == 'reject'){
//     loan.status = 'rejected';
//     res.status(200).send(loan);
//   }
// }
// }

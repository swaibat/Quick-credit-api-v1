import timeago from 'timeago.js';
import { loans, repayments } from '../models/loans';

export class Loan {
  postLoan(req, res) {
    // post the loan
    const loan = {
      id: Math.random().toString(35).slice(2),
      user: req.body.user,
      createdOn: Date.now(),
      status: 'pending',
      repaid: false,
      tenor: req.body.tenor,
      amount: req.body.amount,
      paymentInstallment: (req.body.amount + req.body.interest) / req.body.tenor,
      balance: 63,
      interest: (15 / 100) * req.body.amount,
    };
    loans.push(loan);
    res.status(201).send(loan);
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
    res.status(200).send(loans);
  }

  // View a specific loan
  viewSpecific(req, res) {
    const loan = loans.find(a => a.id === req.params.loanId);
    loan.createdOn = timeago.format(loan.createdOn);
    res.status(200).send(loan);
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


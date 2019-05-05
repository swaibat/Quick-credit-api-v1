import short from 'short-uuid';
import { loans } from '../models/dummyloans';

// apply for loan
export function appliedCheck(req, res, next) {
  const loan = loans.find(a => a.user === req.body.user);
  if (loan){
    res.status(409).send({ message: 'You already applied for a loan. you can request for ​only​ one loan at a time ' });
    return;
  } 
  next();
}

export function postLoan(req, res) {
  // post the loan
  const loan = {
      id: short.generate(),
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


import { loans } from '../models/loans';

// apply for loan
export function appliedCheck(req, res, next) {
  const loan = loans.find(a => a.user === req.body.user);
  if (loan) {
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

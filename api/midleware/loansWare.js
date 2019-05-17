import joi from '@hapi/joi';
import { loans } from '../models/loans';

// post loan validation
export function loanValidate(req, res, next) {
  // joi validation shema
  const schema = {
    user: joi.string().min(3).required(),
    amount: joi.string().min(3).required(),
  };
  const result = joi.validate(req.body, schema);
  // input validation
  if (result.error) {
    res.status(400).send({ message: result.error.details[0].message });
    return;
  }

  next();
}

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
  const loanStatus = loans.filter(b => b.status === req.query.status);
  const loanRepaid = loanStatus.filter(b => b.repaid === JSON.parse(req.query.repaid));
  if (typeof req.query.status !== 'undefined' && typeof req.query.status !== 'undefined') {
    if (loanStatus) {
      if (loanRepaid) {
        res.send(loanRepaid);
      }
    }
    return;
  }
  next();
}

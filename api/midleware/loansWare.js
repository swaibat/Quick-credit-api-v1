import Joi from '@hapi/joi';
import { Loan } from '../models/loans';

const loanObj = new Loan();
// apply for loan
export const appliedCheck = async (req, res, next) => {
  const userEmail = req.body.user;
  // wait for the promise to resolve
  const loan = await loanObj.getLoanByUser(userEmail);
  if (loan.rows.length > 0) {
    res.status(409).send({ message: 'You already applied for a loan. you can request for ​only​ one loan at a time ' });
    return;
  }
  next();
};


export async function query(req, res, next) {
  const { status, repaid } = req.query;

  if (status && repaid) {
    const loansResult = await loanObj.getLoanStatus(status, repaid);
    if (!loansResult.rows || loansResult.rows.length < 1) {
      return res.status().send({error:404,message:'No loan found in that category'})
    }else{
      const data = loansResult.rows;
      res.status(200).send({
        status: '200',
        data,
      });
    }
  }
  else{
    next();
  }
}

export function loansInputValidator(req, res, next) {
  const schema = Joi.object().keys({
    user: Joi.string().email({ minDomainSegments: 2 }).required(),
    tenor: Joi.number().integer().required(),
    amount: Joi.number().integer().required(),
  });
  const result = Joi.validate(req.body, schema);
  // input validation

  if (result.error) {
    const errMsg = result.error.details[0].message
    if (errMsg.match('pattern')){
      return res.status(400).send({ error:404,message: 'Ooops try to insert in a valid character' })
    }
    return res.status(400).send({ message: `${errMsg}` });
  }

  next();
}

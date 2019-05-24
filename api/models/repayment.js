import { pool } from '../services/db';


export default class Repayment{

    createRepaymentRecord(repaymentObj){
        const {createdOn, loanId, amount, monthlyInstallment, balance, paidAmount} = repaymentObj;

        const query = 'INSERT INTO repayments(createdOn, loanId, amount, monthlyInstallment, balance, paidAmount) VALUES($1,$2,$3,$4,$5,$6) RETURNING *';
        const values = [createdOn, loanId, amount, monthlyInstallment, balance, paidAmount];

        return pool.query(query, values) 

    }
} 
import timeago from 'timeago.js';
import { repayments, Loan } from '../models/loans';

const loan = new Loan();
export class LoanController {
  async postLoan(req, res) {
    const interest = (5 / 100) * req.body.amount,
      balance = parseFloat(req.body.amount) + interest,
      loanObj = {
        user: req.body.user,
        createdOn: new Date(),
        status: 'pending',
        repaid: false,
        tenor: req.body.tenor,
        amount: req.body.amount,
        paymentInstallment: parseInt(balance / req.body.tenor),
        balance,
        interest,
      };

    try {
      // waits for the promise to resolve
      const loanObject = await loan.addLoan(loanObj);
      res.status(201).send({
        status: '201',
        loan: loanObject.rows[0],
      });
    } catch (error) {
      res.status(400).send({ error });
    }
  }

  // View loan repayment history
  LoanRepayments(req, res) {
    const loanHistory = repayments.filter(a => a.id === req.params.loanId);
    if (!loanHistory || loanHistory.length < 1) {
      return res.status(404).send({ message: 'No loan repayment history found' });
    }
    loanHistory.forEach((loan) => {
      loan.createdOn = timeago.format(loan.createdOn);
    });
    res.send(loanHistory);
  }

  // View loan repayment history
  async viewLoans(req, res) {
    // wait for the promise to resolve
    let loans;
    try {
      loans = await loan.getAllLoans();
      res.status(200).send({
        status: '200',
        loans: loans.rows,
      });
    } catch (error) {
      res.status(500).send({ error });
    }
  }

  // View a specific loan
  async viewSpecific(req, res) {
    try {
      const singleLoan = await loan.getSingleLoan(req.params.loanId);
      res.status(200).send({ loan: singleLoan.rows[0] });
    } catch (error) {
      res.status(500).send({ error });
    }
  }

  // approve a loan application
  async approveOrRejectLoan(req, res) {
    const { loanId } = req.params;
    const { status } = req.body;

    if (status === 'approved' || status === 'rejected') {
      const loanStatus = await loan.updateLoanStatus(status, loanId);
      const data = loanStatus.rows;
      res.status(200).send({
        status: '200',
        data: {
          status,
        },
      });
    } else {
      res.status(400).send({ message: 'status can only be approved or rejected' });
    }
  }
}

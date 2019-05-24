import Repayment from '../models/repayment';


const repaymentObj = new Repayment();

export default class RepaymentContoller {

  async createRecord(req, res) {
    const {
 amount, monthlyInstallment, balance, paidAmount 
} = req.body;

    const obj = {
      createdOn: new Date(),
      loanId: req.params.loanId,
      amount: parseFloat(amount),
      monthlyInstallment: parseFloat(monthlyInstallment),
      balance: parseFloat(balance),
      paidAmount: parseFloat(paidAmount),
    };

    const result = await repaymentObj.createRepaymentRecord(obj, res)
    console.log('ping ===>', obj);
    const data = result.rows[0]

    res.status(201).send({
        status: "201",
        data
    })

  }
}
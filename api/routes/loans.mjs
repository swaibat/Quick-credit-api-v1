import express from 'express';
import { appliedCheck,query} from '../midleware/loansWare';
import {adminCheck} from '../controllers/usersController';
import { postLoan, approveLoan, rejectLoan,viewLoans,LoanRepayments,viewSpecific} from '../controllers/loansController';
import verifier from 'express-jwt';

const appSecreteKey = 'hksuua7as77hjvb348b3j2hbrbsc9923k';
const router = express.Router();
const verifyToken = verifier({secret:appSecreteKey})


//CLIENT post loan application
router.post('/',verifyToken,appliedCheck, postLoan);

//CLIENT View loan repayment history
router.get('/:loanId/repayments',verifyToken,LoanRepayments);

//ADMIN all loans applications
router.get('/',verifyToken,adminCheck,query,viewLoans);

//ADMIN view specific loans application
router.get('/:loanId',verifyToken,adminCheck,viewSpecific);

//ADMIN  query not repaid loans applications
router.get('/api/v1/loans?status=approved&repaid=false');

//ADMIN  query  repaid loans applications
router.get('/api/v1/loans?status=approved&repaid=true');

//ADMIN  approve loan
router.patch('/:loanId/approve',verifyToken,adminCheck,approveLoan);

//ADMIN  reject loan
router.patch('/:loanId/reject',verifyToken,adminCheck,rejectLoan);

export default router;

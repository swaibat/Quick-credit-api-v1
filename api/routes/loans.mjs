import express from 'express';
import { appliedCheck, postLoan, LoanRepayments,viewLoans,viewSpecific,query} from '../midleware/loansWare';
import {adminCheck} from '../controllers/usersController';


const router = express.Router();


// post loan application
router.post('/',appliedCheck, postLoan);

// View loan repayment history
router.get('/:loanId/repayments',LoanRepayments);

// all loans applications
router.get('/',adminCheck,viewLoans);

// all loans applications
router.get('/:loanId',adminCheck,viewSpecific);

// all loans applications
router.get('/api/v1/loans?status=approved&repaid=false',adminCheck,query);

export default router;

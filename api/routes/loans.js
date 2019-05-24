import express from 'express';
import { appliedCheck, query, loansInputValidator } from '../midleware/loansWare';
import { adminCheck } from '../midleware/usersWare';
import { LoanController } from '../controllers/loansController';
import { ensureToken } from '../midleware/auth';


const router = express.Router();

const loan = new LoanController();

// CLIENT post loan application
router.post('/', loansInputValidator, ensureToken, appliedCheck, loan.postLoan);

// CLIENT View loan repayment history
router.get('/:loanId/repayments', ensureToken, loan.LoanRepayments);

// ADMIN all loans applications
router.get('/', ensureToken, adminCheck, query, loan.viewLoans);

// ADMIN view specific loans application
router.get('/:loanId', ensureToken, adminCheck, loan.viewSpecific);


// ADMIN  approve loan
router.patch('/:loanId', ensureToken, adminCheck, loan.approveOrRejectLoan);


export default router;
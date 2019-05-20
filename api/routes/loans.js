import express from 'express';
import { appliedCheck, query} from '../midleware/loansWare';
import { adminCheck } from '../midleware/usersWare';
import { Loan } from '../controllers/loansController';
import { ensureToken } from '../midleware/auth';

const router = express.Router();


const loan = new Loan();

// CLIENT post loan application
router.post('/', ensureToken, appliedCheck, loan.postLoan);

// CLIENT View loan repayment history
router.get('/:loanId/repayments', ensureToken, loan.LoanRepayments);

// ADMIN all loans applications
router.get('/', ensureToken, adminCheck, query, loan.viewLoans);

// ADMIN view specific loans application
router.get('/:loanId', ensureToken, adminCheck, loan.viewSpecific);

// ADMIN  query not repaid loans applications
router.get('/api/v1/loans?status=approved&repaid=false');

// ADMIN  query  repaid loans applications
router.get('/api/v1/loans?status=approved&repaid=true');

// ADMIN  approve loan
router.patch('/:loanId/approve', ensureToken, adminCheck, loan.approveLoan);

// ADMIN  reject loan
router.patch('/:loanId/reject', ensureToken, adminCheck, loan.rejectLoan);

export default router;

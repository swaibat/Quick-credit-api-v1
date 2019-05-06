import express from 'express';
import { appliedCheck, postLoan, LoanRepayments} from '../midleware/loansWare';


const router = express.Router();


// post loan application
router.post('/', appliedCheck, postLoan);

// View loan repayment history
router.get('/:loanId/repayments',LoanRepayments);

export default router;

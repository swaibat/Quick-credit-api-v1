import express from 'express';
import { appliedCheck, postLoan } from '../midleware/loansWare';


const router = express.Router();


// post loan application
router.post('/', appliedCheck, postLoan);

export default router;


import express from 'express';
import {inputValidator,checkUserExists,postData} from '../midleware/auth';


const router = express.Router();


// signup route
router.post('/auth/signup',inputValidator,checkUserExists,postData);


export default router;

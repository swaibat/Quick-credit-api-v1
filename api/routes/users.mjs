
import express from 'express';
import {inputValidator,checkUserExists,postData,postSignin} from '../midleware/auth';


const router = express.Router();


// signup route
router.post('/auth/signup',inputValidator,checkUserExists,postData);

// signin route
router.post('/auth/signin',postSignin);
    
  

export default router;

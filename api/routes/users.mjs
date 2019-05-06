
import express from 'express';
import {inputValidator,checkUserExists,postData,postSignin} from '../midleware/auth';
import {adminCheck} from '../controllers/usersController';
import {userVerify} from '../midleware/usersWare';


const router = express.Router();


// signup route
router.post('/auth/signup',inputValidator,checkUserExists,postData);

// signin route
router.post('/auth/signin',postSignin);

// Mark a user as verified
router.patch('/:email/verify',adminCheck,userVerify);
    

export default router;

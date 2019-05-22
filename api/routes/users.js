
import express from 'express';
import { inputValidator, checkUserExists } from '../midleware/auth';
import { adminCheck } from '../midleware/usersWare';
import { User } from '../controllers/usersController';
import { userVerify } from '../midleware/usersWare';


const router = express.Router();

const user = new User();

// signup route
router.post('/auth/signup',checkUserExists, user.postData);

// signin route
router.post('/auth/signin', user.postSignin);

// Mark a user as verified
router.patch('/:email/verify', adminCheck, userVerify);


export default router;


import express from 'express';
import { inputValidator, checkUserExists } from '../midleware/auth';
import { adminCheck } from '../midleware/usersWare';
import { UserController } from '../controllers/usersController';
import { userVerify } from '../midleware/usersWare';


const router = express.Router();

const user = new UserController();

// signup route
router.post('/auth/signup', inputValidator, checkUserExists, user.signUp);

// signin route
router.post('/auth/signin', user.signin);

// Mark a user as verified
router.patch('/:email/verify', adminCheck, user.verifyUser);


export default router;

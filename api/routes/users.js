
import express from 'express';
import { inputValidator} from '../midleware/auth';
import { adminCheck } from '../midleware/usersWare';
import { UserController } from '../controllers/usersController';
import { userVerify } from '../midleware/usersWare';


const router = express.Router();

const user = new UserController();

// signup route
router.post('/auth/signup',inputValidator, signUp);

// signin route
// router.post('/auth/signin', user.postSignin);

// Mark a user as verified
// router.patch('/:email/verify', adminCheck, userVerify);


export default router;

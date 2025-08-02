import express from 'express';
import { login, logout, register, resetPassword, sendRestOtp, sendVerifyOtp, userIsAuthenticated, verifyEmail } from '../controllers/userController.js';
import isAuthentication from '../middlewares/userAuth.js';


const router = express.Router();

//user register
// @api :- /api/user/register
router.post('/register', register);

//user login
// @api :- /api/user/login
router.post('/login', login);

//user logout
// @api :- /api/user/logout 
router.post('/logout', logout);

//user verification OTP send to user's email
// @api :- /api/user/send-verify-otp 
router.post('/send-verify-otp', isAuthentication, sendVerifyOtp);

//verify account using OTP
// @api :- /api/user/verify-account 
router.post('/verify-account', isAuthentication, verifyEmail);

//check if user is authenticated
// @api :- /api/user/isAuth
router.post('/is-auth', isAuthentication, userIsAuthenticated);

//Send OTP to Reset Password
// @api :- /api/user/send-reset-otp
router.post('/send-reset-otp', sendRestOtp);


//Reset User Password
// @api :- /api/user/reset-password
router.post('/reset-password', resetPassword);

export default router;
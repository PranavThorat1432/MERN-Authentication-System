import express from 'express';
import isAuthentication from '../middlewares/userAuth.js';
import { getUserData } from '../controllers/userDetails.js';

const router = express.Router();

router.get('/data', isAuthentication, getUserData);

export default router;
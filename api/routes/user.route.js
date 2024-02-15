import express from 'express'
import { deleteUser, getUserListings, test, updateUser } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/VerifyUser.js';

const router = express.Router();

router.get('/test', test );
router.post('/update/:id', verifyToken, updateUser);
router.delete('/delete/:id', verifyToken, deleteUser);
router.get('/listings', getUserListings);

export default router; 
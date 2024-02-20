import express from 'express';
import { activate, google, signOut, signin, signup } from '../controllers/auth.controller.js';

const router = express.Router();

router.post("/signup", signup);
router.get("/confirm/:token", activate);
router.post("/signin", signin);
router.post('/google', google);
router.get('/signout', signOut);

export default router;

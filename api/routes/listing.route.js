import express from 'express'
import { createListing, deleteListing, getListing, updateListing } from '../controllers/listing.controller.js';
import { verifyToken } from '../utils/VerifyUser.js';
import { getAllOrders, getHouse, getUserListings } from '../controllers/user.controller.js';

const router = express.Router();

router.post('/create',verifyToken, createListing);
router.get('/getAllHouses', getUserListings );
router.post('/getHouse/:id', getHouse);
router.get('/getListing/:id', getListing);
router.get('/getAllOrders', getAllOrders );
router.delete('/delete/:id', deleteListing);
router.post('/update/:id', updateListing);

export default router;
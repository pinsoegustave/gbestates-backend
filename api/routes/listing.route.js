import express from 'express'
import { approve, createListing, deleteListing, getListing, getRentHouses, updateListing } from '../controllers/listing.controller.js';
import { getAllOrders, getHouse, getUserListings } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/create', createListing);
router.get('/getAllHouses', getUserListings );
router.post('/getHouse/:id', getHouse);
router.get('/getListing/:id', getListing);
router.get('/getAllOrders', getAllOrders );
router.delete('/delete/:id', deleteListing);
router.post('/update/:id', updateListing);
router.post('/updateOrder/:id', approve);
router.get('/getAllRent', getRentHouses);

export default router;
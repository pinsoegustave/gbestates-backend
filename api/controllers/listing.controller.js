import Listing from "../models/listing.model.js";
import Purchase from "../models/purchase.model.js";
import { errorHandler } from "../utils/error.js";

export const createListing = async (req, res, next) => {

    try {
        const listing = await Listing.create(req.body);
        return res.status(201).json(listing);
        
    } catch (error) {
        return res.status(400).json(error.message);
    }

}

export const getListing = async (req, res, next) => {
    try {
        const listing = await Listing.findById(req.params.id);
        if (!listing) {
            return next(errorHandler(404, 'Listing not found!'));
        }
        res.status(200).json(listing)
    } catch (error) {
        next(error);
    }
}

export const getRentHouses = async (req, res, next) => {
    try {
        const rentHouse = await Listing.find({ type: "rent"});
        if (!rentHouse) {
            return next(errorHandler(404, 'House not for rent!'));
        }
        res.status(200).json(rentHouse);
    } catch (error) {
        next(error);
    }
}

export const getSaleHouses = async (req, res, next) => {
    try {
        const saleHouse = await Listing.find({ type: "sale"});
        if (!saleHouse) {
            return next(errorHandler(404, 'House not for sale!'));
        }
        res.status(200).json(saleHouse);
    } catch (error) {
        next(error);
    }
}

export const deleteListing = async (req, res, next ) => {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
        return next(errorHandler(404, 'Listing not found!'));
    }

    // if (req.user.id !== listing.userRef) {
    //     return next(errorHandler(401, 'You can only delete your own listing!'));
    // }

    try {
        await Listing.findByIdAndDelete(req.params.id);
        res.status(200).json('Listing has been deleted!');
    } catch (error) {
        next(error);
    }
}

export const updateListing = async (req, res, next) => {
    const list = await Listing.findById(req.params.id);

    if(!list) {
        return next(errorHandler(404, 'Listing not found!'));
    }
    // if (req.user.id !==  listing.userRef) {
    //     return next(errorHandler(401, 'You can only update your own listings!'));
    // }

    try {
        const updatedListing = await Listing.findByIdAndUpdate(
            req.params.id,
            req.body, 
            { new: true }
        );
        res.status(200).json(updatedListing);
    } catch (error) {
        next(error);
    }
};

export const approve = async (req, res, next) => {
    const list = await Purchase.findById(req.params.id);
    console.log(req.body);
    if(!list) {
        return next(errorHandler(404, 'Listing not found!'));
    }
    try {
        const updateOrder = await Purchase.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(200).json(updateOrder);
    } catch (error) {
        next(error);
    }
}
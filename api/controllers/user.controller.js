import User from "../models/user.model.js";
import Listing from "../models/listing.model.js";
import Purchase from "../models/purchase.model.js"
import { errorHandler } from "../utils/error.js";
import bcryptjs from 'bcryptjs';


export const test = (res, req) => {
    res.json({
        message: 'Hello world!!',
    });
};

export const updateUser = async(req, res, next) => {
    if (req.user.id !== req.params.id) return next(errorHandler(401, "You can only update your own account!"));
    try {
        if (req.body.password) {
            req.body.password = bcryptjs.hashSync(req.body.password, 10)
        }

        const updateUser = await User.findByIdAndUpdate(req.params.id, {
            $set: {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                avatar: req.body.avatar,
            }
        }, {new: true})

        const {password, ...rest} = updateUser._doc;
        res.status(200).json(rest)
    }
    catch (error) {
        // next(error);
        console.log(error);
    }
};

export const deleteUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) return next(errorHandler(401, 'You can only delete your account!'));

    try {
        await User.findByIdAndDelete(req.params.id)
        res.clearCookie('access_token');
        res.status(200).json('User has been deleted');
    } catch (error) {
        next(error)
    }
}

export const getUserListings = async (req, res, next) => {
    try {
        const allHouses = await Listing.find({}).sort({ _id: -1 });
        res.status(200).json(allHouses);
    } catch (error) {
        next(errorHandler(error));
    }
    
}

export const getHouse = async (req, res, next) => {
    const id = req.params.id

    try {
        Listing.findById(id).then(async (result) => {
            if(result == null){
                res.status(404).json({message: "Invalid house"})
            }
            else{
                const housen = result.name
                // res.status(200).send({ success:true, msg: "House found succesfully"})
                const newPurchase = new Purchase({
                    name: req.body.name,
                    email: req.body.email,
                    phone: req.body.phone,
                    house: housen
                })
                await newPurchase.save();
                
            }
            res.status(201).json({message: "New Purchase sent"})
        });
    } catch (error) {
        res.status(400).json({ message: error.message})
    }
}

export const getAllOrders = async (req, res, next) => {
    try {
        const allOrders = await Purchase.find({}).sort({ _id: -1 });
        res.status(200).json(allOrders);
    } catch (error) {
        next(errorHandler(error));
    }
}

export const getAllUsers = async (req, res, next) => {
    try {
      const allUsers = await User.find({}).sort({ _id: -1});
      res.status(200).json(allUsers);  
    } catch (error) {
        next(errorHandler(error));
    }
}
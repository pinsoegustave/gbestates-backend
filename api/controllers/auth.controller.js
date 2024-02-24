import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs'
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';
import crypto from "crypto";
import Token from "../models/token.model.js";
import verifyEmail from "../utils/sendEmail.js";

export const signup = async(req, res, next) => {

    const { username, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10)
    const newUser = new User({ username, email, password: hashedPassword });

    try {
        await newUser.save();
        // Generate verification token
        const token = new Token ({
            userId: newUser._id ,
            token: crypto.randomBytes(16).toString('hex')
        });
        await token.save();
        console.log(token)
        // res.status(201).json("User Created Successfully!");

        const link = `https://gbestates.onrender.com/api/auth/confirm/${token.token}`;
        await verifyEmail(email, link);
        res.status(200).send({
            message: "Verification link sent, check your inbox"
        })
    }
    catch (error) {
        next(error);
    }
};

// Activate account
export const activate = async (req, res, next) => {
    try {
        const token = await Token.findOne({
            token: req.params.token,
        })
        console.log(token);
        await User.updateOne({_id: token.userId},{$set:{verified: true}});
        await Token.findByIdAndDelete(token._id);
        res.send("Email verified");
    } catch (error) {
        next(error);
    }
}

export const signin = async(req, res, next) => {
    const { email, password } = req.body;

    try {
        const validUser = await User.findOne({ email });
        if ( !validUser ) return next(errorHandler(404, 'User not found!'));
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) return next(errorHandler(401, 'Wrong credentials!'));

        if (validUser && validUser.verified) {
            const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
        

        const { password: pass, ...rest } = validUser._doc;
        res.cookie('access_token', token, { httpOnly: true })
        .status(200).
        json(rest);
        }
        res.send("You have to verify your account first!")
    } catch (error) {
        next(error )
    }
};

export const google = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (user) {
            const token = jwt.sign({ id: user._id}, process.env.JWT_SECRET);
            const { password: pass, ...rest } = user._doc;
            res.cookie('access-token', token, { httpOnly: true })
            .status(200)
            .json(rest);
        }
        else {
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(8);
            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
            const newUser = new User({ username: req.body.name.split(" ").join("").toLowerCase() +Math.random().toString(36).slice(-4), email: req.body.email, password: hashedPassword, avatar: req.body.photo})

            await newUser.save();
            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
            const { password: pass, ...rest } = newUser._doc;
            res.cookie('access_token', token, { httpOnly: true }).status(200).json(rest);

        }
    }
    catch (error ) {
        next (error);
    }
}

export const signOut = async(req, res, next) => {
    try {
        res.clearCookie('access_token');
        res.status(200).json('User has been logged out!');
    } catch (error) {
        next(error);
    }
}
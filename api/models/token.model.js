import mongoose from "mongoose";


const tokenSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        ref: "user",
        unique: true,
    },
    token: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: 10800
    },
});

const Token = mongoose.model("Token", tokenSchema);

export default Token;
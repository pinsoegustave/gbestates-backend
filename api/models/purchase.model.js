import mongoose from 'mongoose';

const purchaseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    house: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "Pending"
    }
})

const Purchase = mongoose.model('Purchase', purchaseSchema)

export default Purchase;
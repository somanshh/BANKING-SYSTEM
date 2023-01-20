const mongoose = require('mongoose');

const customerSchema = mongoose.Schema({
    name: {
        type: String,
        required : true,
    },
    email: {
        type: String,
        required : true,
        unique : true,
    },
    transferHistory: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Transfer"
        }
    ],
    recievedHistory: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Transfer"
        }
    ],
    currentBalance: {
        type: Number,
        default:0
    },
    transferedBalance: {
        type: Number,
        default:0
    },
    recievedBalance: {
        type: Number,
        default:0
    }
})

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
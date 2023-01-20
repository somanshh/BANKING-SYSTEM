const mongoose = require('mongoose');

const transferSchema = mongoose.Schema({

    reciever: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer" 
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer" 
    },
    AmountTransfered: {
        type: String
    },
    transferedDate: {
        type: Date,
        default: Date.now
    }
})

const Transfer = mongoose.model('Transfer', transferSchema);

module.exports = Transfer;
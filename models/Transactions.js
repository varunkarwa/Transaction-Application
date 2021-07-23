const mongoose = require('mongoose');

const TransactionSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    accountNo:{
        type: Number,
        required: true,
        validate : {
            validator: Number.isInteger,
            message : ' {VALUE} is not an integer value'
        }
    },
    amount:{
        type: Number,
        required: true,
        validate : {
            validator: Number.isInteger,
            message : ' {VALUE} is not an integer value'
        }
    },
    type:{
        type: String,
        default: 'Deposit'
    },
    date:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('transactions', TransactionSchema);
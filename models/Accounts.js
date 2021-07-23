const mongoose = require('mongoose');

const AccountSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    name:{
        type: String,
        required: true
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
        default: 'Current'
    }
});

module.exports = mongoose.model('accounts', AccountSchema);
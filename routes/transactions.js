const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {check, validationResult } = require('express-validator/check');

const User = require('../models/User');
const Transaction = require('../models/Transactions');

// @route   GET api/transactions
// @desc    Get all users transactions
// @access  Private
router.get('/', auth, async (req, res) => {
    try{
        const transactions = await Transaction.find({ user: req.user.id });
        res.json(transactions);
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/transactions
// @desc    Add new transaction
// @access  Private
router.post('/', [ auth, [
    check( 'accountNo', 'Account Number is required').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }
    
    const {accountNo, amount, type} = req.body;
     try {
         const newTransaction = new Transaction({            
            accountNo,
            amount,
            type,
            user: req.user.id
         });

         const transaction = await newTransaction.save();
         res.json(transaction);
     } catch (err) {
         console.error(err.message);
         res.status(500).send('Server Error');
     }
});

module.exports = router;
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {check, validationResult } = require('express-validator/check');

const User = require('../models/User');
const Account = require('../models/Accounts');

// @route   GET api/accounts
// @desc    Get all users accounts
// @access  Private
router.get('/', auth, async (req, res) => {
    try{
        const accounts = await Account.find({ user: req.user.id });
        res.json(accounts);
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   Put api/accounts/:id
// @desc    Update account
// @access  Private
router.put('/:id', auth, async (req, res) => {
    const { name, accountNo, amount, type} = req.body;

    //Build account object
    const accountFields = {};
    if (name) accountFields.name = name;
    if (accountNo) accountFields.accountNo = accountNo;
    if (amount) accountFields.amount = amount;
    if (type) accountFields.type = type;

    try {
        let account = await Account.findById(req.params.id);

        if (!account) return res.status(404).json({ msg: "Account not found"});

        if( account.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: "Not authorized"});
        }

        account = await Account.findByIdAndUpdate(
            req.params.id,
            {$set: accountFields},
            {new: true},
        );

        res.json(account);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


module.exports = router;
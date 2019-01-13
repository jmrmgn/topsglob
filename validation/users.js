const { body } = require('express-validator/check');

const User = require('../models/User');

module.exports = {
   validateRegister: [
      body('username')
         .isLength({ min: 3, max: 20 }).withMessage('Username must be at least 3 - 20 characters')
         .isAlphanumeric().withMessage('Username must be alphanumeric only')
         .custom(async (value) => {
            const username = await User.findOne({ username: value });
            if (username) {
               return Promise.reject('Username is already taken');
            }
         })
         .trim(),
      body('email')
         .isEmail().withMessage('Invalid email')
         .custom(async (value) => {
            const email = await User.findOne({ email: value });
            if (email) {
               return Promise.reject('Email is already taken');
            }
         })
         .trim(),
      body('password')
         .isLength({ min: 8, max: 100 }).withMessage('Password must be at least 8 characters')
         .trim()
   ]
};
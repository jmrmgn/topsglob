const { body, check } = require('express-validator/check');

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
         .trim(),
      body('confirmPassword')
         .custom((value, {req}) => {
            if (value !== req.body.password) {
               throw new Error('Passwords doesn\'t match');
            }
            else {
               return true;
            }
         })
   ],
   validateLogin: [
      body('username')
         .not().isEmpty().withMessage('Username is required'),
      body('password')
         .not().isEmpty().withMessage('Password is required'),
   ],
   validatePutCurrentProfile: [
      body('bio')
         .isLength({ max: 200 }).withMessage('Bio can\'t exceed of 200 characters')
   ],
   validatePutChangePassword: [
      body('currentPassword')
         .not().isEmpty().withMessage('Current password is required'),
      body('newPassword')
         .isLength({ min: 8, max: 100 }).withMessage('New password must be at least 8 characters')
         .custom((value, {req}) => {
            if (value !== req.body.newPassword2) {
               throw new Error('Passwords doesn\'t match');
            }
            else {
               return true;
            }
         })
         .trim()
   ]
};
const express = require('express');
const router = express.Router();
const passport = require('passport');

// Controller
const usersController = require('../../controllers/usersController');

// Validation
const userValidation = require('../../validation/users');

/*
   @route      POST api/users/register
   @desc       Register user
   @accecss    PUBLIC
*/
router.post(
   '/register',
   userValidation.validateRegister,
   usersController.postRegister
);

/*
   @route      POST api/users/login
   @desc       Login user
   @accecss    PUBLIC
*/
router.post(
   '/login',
   userValidation.validateLogin,
   usersController.postLogin
);

/*
   @route      GET api/users/current
   @desc       Token validation
   @accecss    PRIVATE (temporary)
*/
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
   res.json({
      id: req.user._id,
      name: req.user.username
   });
});


module.exports = router;
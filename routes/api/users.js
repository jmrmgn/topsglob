const express = require('express');
const router = express.Router();
const passport = require('passport');

// Controller
const usersController = require('../../controllers/usersController');

// Validation
const userValidation = require('../../validation/users');

/*
   @route      GET api/users/
   @desc       Get all users
   @accecss    PUBLIC
*/
router.get(
   '/',
   usersController.getUsers
);


/*
   @route      GET api/users/
   @desc       Get current user profile
   @accecss    PRIVATE
*/
router.get(
   '/profile',
   passport.authenticate('jwt', { session: false }),
   usersController.getUserProfile
);


/*
   @route      PUT api/users/profile
   @desc       Update current user profile
   @accecss    PRIVATE
*/
router.put(
   '/profile',
   passport.authenticate('jwt', { session: false }),
   userValidation.validatePutCurrentProfile,
   usersController.putUserProfile
);


/*
   @route      GET api/users/:userId
   @desc       Get single user
   @accecss    PUBLIC
*/
router.get(
   '/:userId',
   usersController.getUser
);


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
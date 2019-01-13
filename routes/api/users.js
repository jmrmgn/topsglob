const express = require('express');
const router = express.Router();

// Controller
const usersController = require('../../controllers/usersController');

// Validation
const userValidation = require('../../validation/users');

router.post(
   '/',
   userValidation.validateRegister,
   usersController.postRegister
);

module.exports = router;
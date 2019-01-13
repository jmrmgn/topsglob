const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator/check');

const keys = require('../config/keys');

const User = require('../models/User');

exports.getUsers = async (req, res, next) => {
   try {
      const users = await User.find().select('-password').exec();
      return (!users) ? res.json({}) : res.json(users);
   }
   catch (err) {
      (!err.statusCode) ? (err.statusCode = 500) : next(err.errors);
   }
};

exports.getUser = async (req, res, next) => {
   try {
      const userId = req.params.userId;
      const user = await User.findById(userId).select('-password').exec();
      return (!user) ? res.status(404).json({ errors: "User not found" }) : res.json(user);
   }
   catch (err) {
      (!err.statusCode) ? (err.statusCode = 500) : next(err.errors);
   }
};

exports.postRegister = async (req, res, next) => {
   try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
         return res.status(422).json({ errors: errors.array() });
      }

      const username = req.body.username;
      const email = req.body.email;
      const password = req.body.password;

      const hashPw = await bcrypt.hash(password, 12);
      const userData = await new User({
         username,
         email,
         password: hashPw
      });

      await userData.save();
      res.status(201).json({ msg: "Successfully registered" });
   }
   catch (err) {
      (!err.statusCode) ? (err.statusCode = 500) : next(err.errors);
   }
};

exports.postLogin = async (req, res, next) => {
   try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
         return res.status(422).json({ errors: errors.array() });
      }

      const username = req.body.username;
      const password = req.body.password;

      const user = await User.findOne({ username: username });
      if (!user) {
         return res.status(404).json({ errors: "User not found" });
      }
      else {
         const isMatch = await bcrypt.compare(password, user.password);
         if (isMatch) {
            // Create jwt
            const payload = {
               id: user._id,
               username: user.username
            };

            // Signing in the jwt
            const token = await jwt.sign(payload, keys.secret, { expiresIn: '24h' });
            return res.json({
               token: `Bearer ${token}`
            });
         }
         else {
            return res.status(422).json({ errors: "Invalid credentials" });
         }
      }

   }
   catch (err) {
      (!err.statusCode) ? (err.statusCode = 500) : next(err.errors);
   }
};

exports.getUserProfile = async (req, res, next) => {
   try {
      res.json(req.user);
   }
   catch (err) {
      (!err.statusCode) ? (err.statusCode = 500) : next(err.errors);
   }
};

exports.putUserProfile = async (req, res, next) => {
   try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
         return res.status(422).json({ errors: errors.array() });
      }
      
      const user = await User.findById(req.user._id);

      if (!user) {
         return res.status(404).json({ errors: "Not found" });
      }
      else {
         user.bio = req.body.bio;
         await user.save();
         return res.status(201).json({ msg: "Profile successfully updated" });
      }
   }
   catch (err) {
      (!err.statusCode) ? (err.statusCode = 500) : next(err.errors);
   }
};
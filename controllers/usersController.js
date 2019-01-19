const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator/check');

const throwError = require('../middlewares/errorHandler').errorHandler;
const keys = require('../config/keys');

const User = require('../models/User');
const Post = require('../models/Post');

// const errorTracker = (req, next) => {
//    const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
//       return `${msg}`;
//    };
   
//    const errors = validationResult(req).formatWith(errorFormatter);

//    if (!errors.isEmpty()) {
//       return next(throwError(errors.mapped(), 422));
//    }
// }

exports.getUsers = async (req, res, next) => {
   try {
      const users = await User.find().select('-password').exec();
      return (!users) ? res.json({}) : res.json(users);
   }
   catch (err) {
      next(err);
   }
};

exports.getUser = async (req, res, next) => {
   try {
      const userId = req.params.userId;
      const user = await User.findById(userId).select('-password').exec();
      return (!user) 
         ? next(throwError("User not found", 404))
         : res.json(user);
   }
   catch (err) {
      next(err);
   }
};

exports.getUserPosts = async (req, res, next) => {
   try {
      const userId = req.params.userId;
      const userPosts = await Post.find({ user: userId });
      return (userPosts)
         ? res.json(userPosts)
         : res.json({});
   }
   catch (err) {
      console.log(err);
      next(err);
   }
};

exports.postRegister = async (req, res, next) => {
   try {
            
      const errors = validationResult(req).formatWith(({ msg }) => msg);
   
      if (!errors.isEmpty()) {
         return next(throwError(errors.mapped(), 422));
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
      next(err);
   }
};

exports.postLogin = async (req, res, next) => {
   try {
      const errors = validationResult(req).formatWith(({ msg }) => msg);
   
      if (!errors.isEmpty()) {
         return next(throwError(errors.mapped(), 422));
      }

      const username = req.body.username;
      const password = req.body.password;

      const user = await User.findOne({ username: username });
      if (!user) {
         return next(throwError("User not found", 404));
      }
      else {
         const isMatch = await bcrypt.compare(password, user.password);
         if (isMatch) {
            // Create jwt
            const payload = {
               id: user._id,
               username: user.username,
               email: user.email,
               createdAt: user.createdAt
            };

            // Signing in the jwt
            const token = await jwt.sign(payload, keys.secret, { expiresIn: 3600 });
            return res.json({
               token: `Bearer ${token}`
            });
         }
         else {
            return next(throwError("Invalid credentials", 422));
         }
      }

   }
   catch (err) {
      next(err);
   }
};

exports.getUserProfile = async (req, res, next) => {
   try {
      res.json(req.user);
   }
   catch (err) {
      next(err);
   }
};

exports.putUserProfile = async (req, res, next) => {
   try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
         return next(throwError(errors.array(), 422));
      }
      
      const user = await User.findById(req.user._id);

      if (!user) {
         return next(throwError("Unauthorized", 401));
      }
      else {
         user.bio = req.body.bio;
         await user.save();
         return res.status(201).json({ msg: "Profile successfully updated" });
      }
   }
   catch (err) {
      next(err);
   }
};

exports.putUserChangePassword = async (req, res, next) => {
   try {
      const currentPassword = req.body.currentPassword;
      const newPassword = req.body.newPassword;

      const user = await User.findOne({ _id: req.user._id });

      if (!user) {
         return next(throwError("Unauthorized", 401));
      }
      else {
         const errors = validationResult(req);

         if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
         }

         const isMatch = await bcrypt.compare(currentPassword, user.password);
         if (!isMatch) {
            return next(throwError("Invalid password", 422));
         }
         else {
            const hashNewPw = await bcrypt.hash(newPassword, 12);
            user.password = hashNewPw;
            await user.save();

            return res.status(201).json({ msg: "Password successfully changed"});
         }
      }
   }
   catch (err) {
      next(err);
   }
};
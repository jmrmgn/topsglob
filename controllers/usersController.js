const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator/check');

const User = require('../models/User');

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
      res.status(201).json(userData);
   }
   catch (err) {
      (!err.statusCode) ? (err.statusCode = 500) : next(err.errors);
      console.log(err.errors);
   }
};
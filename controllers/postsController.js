const { validationResult } = require('express-validator/check');

const Post = require('../models/Post');
const User = require('../models/User');

exports.getPosts = async (req, res, next) => {
   try {
      const posts = await Post.find();
      if (!posts) {
         return res.json({});
      }
      else {
         return res.json(posts);
      }
   }
   catch (err) {
      (!err.statusCode) ? (err.statusCode = 500) : next(err.errors);
   }
};

exports.postPost = async (req, res, next) => {
   try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
         return res.status(422).json({ errors: errors.array() });
      }

      const content = req.body.content;
      const userId = req.user._id;

      const newPost = new Post({ 
         content,
         user: userId
      });

      await newPost.save();
      return res.status(201).json(newPost);
   }
   catch (err) {
      (!err.statusCode) ? (err.statusCode = 500) : next(err.errors);
   }
};
const { validationResult } = require('express-validator/check');

const throwError = require('../middlewares/errorHandler').errorHandler;

const Post = require('../models/Post');

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
      next(err);
   }
};

exports.getPost = async (req, res, next) => {
   try {
      const post = await Post.findOne({ _id: req.params.postId });
      if (!post) {
         return next(throwError("Post not found", 404));
      }
      else {
         return res.json(post);
      }
   }
   catch (err) {
      next(err);
   }
};

exports.postPost = async (req, res, next) => {
   try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
         return next(throwError(errors.array(), 422));
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

exports.putPost = async (req, res, next) => {
   try {

      const post = await Post.findById(req.params.postId);
      if (!post) {
         return next(throwError("Post not found", 404));
      }
      else {
         if ( post.user.toString() === req.user._id.toString()) {

            const errors = validationResult(req);

            if (!errors.isEmpty()) {
               return next(throwError(errors.array(), 422));
            }

            post.content = req.body.content;
            await post.save();
            return res.status(201).json({ msg: "Post successfully updated" });
         }
         else {
            return next(throwError("Unauthorized", 401));
         }
      }
   }
   catch (err) {
      next(err);
   }
};

exports.deletePost = async (req, res, next) => {
   try {
      const post = await Post.findById(req.params.postId);
      if (!post) {
         return next(throwError("Post not found", 404));
      }
      else {
         if ( post.user.toString() === req.user._id.toString()) {
            await post.delete();
            return res.status(200).json({ msg: "Post deleted" });
         }
         else {
            return next(throwError("Unauthorized", 401));
         }
      }
   }
   catch (err) {
      next(err);
   }
};

exports.putLikePost = async (req, res, next) => {
   try {
      const post = await Post.findById(req.params.postId);
      if (!post) {
         return next(throwError("Post not found", 404));         
      }
      else {
         if (post.likes.filter(like => like.user.toString() === req.user._id.toString()).length > 0) {
            return next(throwError("Already liked this post.", 422));
         }
         else {
            post.likes = [{user: req.user.id}, ...post.likes];
            await post.save();
            return res.status(201).json({ msg: "Post liked" });
         }
      }
   }
   catch (err) {
      next(err);
   }
};

exports.putUnlikePost = async (req, res, next) => {
   try {
      const post = await Post.findById(req.params.postId);
      if (!post) {
         return next(throwError("Post not found", 404));         
      }
      else {
         if (post.likes.filter(like => like.user.toString() === req.user._id.toString()).length > 0) {
            // perform dislike
            post.likes = post.likes.filter(like => like.user.toString() !== req.user._id.toString());
            await post.save();
            return res.status(201).json({ msg: "Post unlike" });
            
         }
         else {
            // Not have yet like the post
            return next(throwError("Post not yet like", 422));
         }
      }
   }
   catch (err) {
      next(err);
   }
};
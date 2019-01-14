const express = require('express');
const router = express.Router();
const passport = require('passport');

const postsController = require('../../controllers/postsController');

const postValidation = require('../../validation/post');

/*
   @route      GET api/posts/
   @desc       Get all posts
   @accecss    PUBLIC
*/
router.get(
   '/',
   postsController.getPosts
);


/*
   @route      POST api/posts/
   @desc       Create new post
   @accecss    PRIVATE
*/
router.post(
   '/',
   passport.authenticate('jwt', { session: false}),
   postValidation.validatePostPost,
   postsController.postPost
);


/*
   @route      GET api/posts/:postId
   @desc       Get single post
   @accecss    PUBLIC
*/
router.get(
   '/:postId',
   postsController.getPost
);


/*
   @route      PUT api/posts/:postId
   @desc       Update single post
   @accecss    PRIVATE
*/
router.put(
   '/:postId',
   passport.authenticate('jwt', { session: false}),
   postValidation.validatePostPost, // Same validation for posting
   postsController.putPost
);


/*
   @route      DELETE api/posts/:postId
   @desc       Delete single post
   @accecss    PRIVATE
*/
router.delete(
   '/:postId',
   passport.authenticate('jwt', { session: false}),
   postsController.deletePost
);


/*
   @route      PUT api/posts/:postId/like
   @desc       Like a post
   @accecss    PRIVATE
*/
router.put(
   '/:postId/like',
   passport.authenticate('jwt', { session: false}),
   postsController.putLikePost
);


/*
   @route      PUT api/posts/:postId/unlike
   @desc       Unlike a post
   @accecss    PRIVATE
*/
router.put(
   '/:postId/unlike',
   passport.authenticate('jwt', { session: false}),
   postsController.putUnlikePost
);

module.exports = router;
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


module.exports = router;
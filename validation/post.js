const { body, check } = require('express-validator/check');

module.exports = {
   validatePostPost: [
      body('content')
         .isLength({ min: 10 }).withMessage('Content must have at least 10 characters'),
   ],
}
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
   username: {
      type: String,
      required: true
   },
   email: {
      type: String,
      required: true
   },
   password: {
      type: String,
      required: true
   },
   bio: {
      type: String
   }
}, { timestamps: true });

module.exports = mongoose.model('users', UserSchema, 'users');
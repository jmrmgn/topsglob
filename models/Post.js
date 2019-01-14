const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
   content: {
      type: String,
      required: true
   },
   user: {
      type: Schema.Types.ObjectId,
      ref: 'users'
   },
   likes: [
      {
         user: {
            type: Schema.Types.ObjectId,
            refs: 'users'
         }
      }
   ]
}, { timestamps: true });

module.exports = mongoose.model('posts', PostSchema, 'posts');
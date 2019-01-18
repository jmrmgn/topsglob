const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
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

mongoose.plugin(mongoosePaginate);
module.exports = mongoose.model('posts', PostSchema, 'posts');
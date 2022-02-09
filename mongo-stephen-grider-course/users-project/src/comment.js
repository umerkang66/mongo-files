const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  content: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    // "ref" is the name of the model to which this user is referencing
    ref: 'user',
  },
});

const Comment = mongoose.model('comment', commentSchema);

module.exports = Comment;

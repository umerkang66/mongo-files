const mongoose = require('mongoose');

// Creating the schema
const blogPostSchema = new mongoose.Schema({
  title: String,
  content: String,
  // Here we have to reference of another document from another collection, in this example blog post document should have reference to the comments that this blog post has
  // We are passing the reference to the another model (document sitting the comment collection)
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'comment' }],
});

// Creating the model out of schema
// Collection name will be this blogPost but in plural form (blogPosts)
const BlogPost = mongoose.model('blogPost', blogPostSchema);

module.exports = BlogPost;

const mongoose = require('mongoose');
const postSchema = require('./post');

// Schema tells us the type of properties that are inside the User Model
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    validate: {
      // Validator will be called by name is argument, that we can validate
      validator: name => {
        // We have to return true, or false
        return name.length > 2;
      },
      message: 'Name must be longer than 2 characters',
    },
    required: [true, 'Name is required'],
  },
  likes: {
    type: Number,
    default: 0,
  },
  // If we specify Schema here, mongoose is going to assume that it should be a list of postSchema embedded documents
  posts: [postSchema],
  blogPosts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'blogPost',
    },
  ],
});

// Virtual Property
// When we will access postCount rather than giving the raw value, but it will give a computed value through this function because, this postCount property will be getter
userSchema.virtual('postCount').get(function () {
  // Whatever we will return form this function will be the computed the value of postCount
  // Here "this" is instance of User Model, means it will _id property and all the other properties that are specified in the userSchema
  return this.posts.length;
});

// Middlewares: Pre and Post event hooks
userSchema.pre('remove', function (next) {
  // This callback function will be called before any record will be deleted by "deleteOne"
  // Here "this" === "newUser"
  // We can pull other models by using this
  const BlogPostModel = mongoose.model('blogPost');

  // $in operator expects an array and find the documents according the values specified
  BlogPostModel.deleteOne({ _id: { $in: this.blogPosts } }).then(() => next());
});

// Model is the entire collection is the database (in the plural form i.e."users")
// The first argument will be made for collection name
// We can also call it User model or User class
const User = mongoose.model('user', userSchema);

module.exports = User;

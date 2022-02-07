const mongoose = require('mongoose');

// Schema tells us the type of properties that are inside the User Model
const userSchema = new mongoose.Schema({
  name: String,
  postCount: Number,
});

// Model is the entire collection is the database
// The first argument will be made for collection name
// We can also call it User model or User class
const User = mongoose.model('user', userSchema);
module.exports = User;

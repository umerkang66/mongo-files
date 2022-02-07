const mongoose = require('mongoose');

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
  postCount: Number,
});

// Model is the entire collection is the database
// The first argument will be made for collection name
// We can also call it User model or User class
const User = mongoose.model('user', userSchema);
module.exports = User;

const mongoose = require('mongoose');

// We are only creating the Schema (not model or collection), because this will be embedded collection in the user file
const postSchema = new mongoose.Schema({
  title: String,
});

module.exports = postSchema;

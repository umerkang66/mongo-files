const mongoose = require('mongoose');

// creating the schema
const driverSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  driving: {
    type: Boolean,
    default: false,
  },
});

// creating the model
const Driver = mongoose.model('drivers', driverSchema);

module.exports = Driver;

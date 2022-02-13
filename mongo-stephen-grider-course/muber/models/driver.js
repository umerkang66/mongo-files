const mongoose = require('mongoose');

const pointSchema = new mongoose.Schema({
  type: {
    type: String,
    default: 'Point',
  },
  coordinates: {
    type: [Number],
    index: '2dsphere',
  },
});

// creating the schema
const driverSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  driving: {
    type: Boolean,
    default: false,
  },
  geometry: pointSchema,
});

// creating the model
const Driver = mongoose.model('driver', driverSchema);

module.exports = Driver;

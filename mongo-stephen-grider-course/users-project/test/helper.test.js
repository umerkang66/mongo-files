// Starting setup of testing-library
const mongoose = require('mongoose');

// We have to run the other test, only after we connect to the database, so we have to sue
// Difference between before, and beforeEach that beforeEach runs after every "it" statement, but before only runs once
before(done => {
  // Connecting too the local mongodb instance
  // Last part is mongodb database name
  mongoose.connect('mongodb://localhost:27017/users_test');

  // Wait for the connection and fire for the callback when it connects "open", or if error happens "error"
  mongoose.connection
    .once('open', () => {
      console.log('Connected to the database');
      // Run the other test after connecting to the database
      done();
    })
    .on('error', err => {
      console.warn('Warning', err);
    });
});

// beforeEach is a function that will run before every test
beforeEach(done => {
  // Whole user collection will be deleted before every test
  mongoose.connection.collections.users.drop(err => {
    // When we call done we are saying that run next test
    if (err) return console.log(err);
    done();
  });
});

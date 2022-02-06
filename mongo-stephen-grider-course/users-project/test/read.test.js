const assert = require('assert');
const User = require('../src/users');

describe('Reading users out of database', () => {
  let newUser;

  // The purpose of this beforeEach to insert a record of User instance in database as the name of anything we will using in our it statement like "umer"
  beforeEach(done => {
    newUser = new User({ name: 'Umer' });

    // Saving the user and running other test
    newUser.save().then(() => {
      done();
    });
  });

  it('finds all users with a name of joe', done => {
    console.log(newUser._id);

    // newUser is an instance of User
    User.find({ name: 'Umer' }).then(data => {
      // Check if id of the user we created is the same to the id of the user we got from database
      // Make sure to call toString() because id is not a string but an object (ObjectId)
      assert(data[0]._id.toString() === newUser._id.toString());
      done();
    });
  });
});

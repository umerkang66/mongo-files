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

  it('finds all users with a name of Umer', done => {
    // newUser is an instance of User
    User.find({ name: newUser.name }).then(users => {
      // Check if id of the user we created is the same to the id of the user we got from database
      // Make sure to call toString() because id is not a string but an object (ObjectId)
      assert(users[0]._id.toString() === newUser._id.toString());
      done();
    });
  });

  it('find a user with a particular id', done => {
    User.findOne({ _id: newUser._id }).then(user => {
      assert(user.name === 'Umer');
      done();
    });
  });
});

const assert = require('assert');
const User = require('../src/user');

describe('Reading users out of database', () => {
  let newUser, newUser1, newUser2, newUser3;

  // The purpose of this beforeEach to insert a record of User instance in database as the name of anything we will using in our it statement like "umer"
  beforeEach(done => {
    // Names are in ascending order
    newUser = new User({ name: 'Ahmad' });
    newUser1 = new User({ name: 'Gulzar' });
    newUser2 = new User({ name: 'Kang' });
    newUser3 = new User({ name: 'Umer' });

    // Make sure to save it without order
    Promise.all([
      newUser3.save(),
      newUser2.save(),
      newUser1.save(),
      newUser.save(),
    ]).then(() => {
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
      assert(user.name === 'Ahmad');
      done();
    });
  });

  // Pagination with skip limit
  it('can skip and limit the result set', async () => {
    const users = await User.find({}).sort({ name: 1 }).skip(1).limit(2);

    assert(users.length === 2);
    assert(users[0].name === 'Gulzar');
    assert(users[1].name === 'Kang');
  });
});

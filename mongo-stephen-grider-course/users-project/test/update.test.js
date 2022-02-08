const assert = require('assert');
const User = require('../src/user');

describe('Update a User', () => {
  let newUser;
  const newName = 'Umer Kang';
  const initialLikes = 1;

  beforeEach(done => {
    // We currently dont have likes property in the schema, but we can still specify it but it will not be saved into the database
    newUser = new User({ name: 'Umer', likes: initialLikes });
    newUser.save().then(() => done());
  });

  const assertName = (operation, done) => {
    // Find all the users
    operation
      .then(() => User.find({ _id: newUser._id }))
      .then(users => {
        assert(users.length === 1);
        assert(users[0].name === newName);
        done();
      });
  };

  it('instance using set and save', done => {
    newUser.set('name', newName);
    assertName(newUser.save(), done);
  });

  // Class based updates
  it('class updateMany', done => {
    assertName(
      User.updateMany({ name: newUser.name }, { $set: { name: newName } }),
      done
    );
  });

  it('class updateOne', done => {
    assertName(
      User.updateOne({ name: newUser.name }, { $set: { name: newName } }),
      done
    );
  });

  it('class findOneAndUpdate', done => {
    assertName(
      User.findOneAndUpdate(
        { name: newUser.name },
        { $set: { name: newName } }
      ),
      done
    );
  });

  it('class FindByIdAndUpdate', done => {
    assertName(User.findByIdAndUpdate(newUser._id, { name: newName }), done);
  });

  // xit means this test will not run by mocha
  it('A user can have their likes incremented by 1', done => {
    User.updateMany({ _id: newUser._id }, { $inc: { likes: 13 } })
      .then(() => User.find({}))
      .then(users => {
        assert(users[0].likes === initialLikes + 13);
        done();
      });
  });
});

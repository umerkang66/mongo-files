const assert = require('assert');
const User = require('../src/users');

describe('Update a User', () => {
  let newUser;
  const newName = 'Umer Kang';
  const initialPostCount = 1;

  beforeEach(done => {
    newUser = new User({ name: 'Umer', postCount: initialPostCount });
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

  it('A user can have their postCount incremented by 1', done => {
    User.updateMany({ _id: newUser._id }, { $inc: { postCount: 13 } })
      .then(() => User.find({}))
      .then(users => {
        assert(users[0].postCount === initialPostCount + 13);
        done();
      });
  });
});

const assert = require('assert');
const User = require('../src/users');

describe('Deleting a user', () => {
  let newUser;

  beforeEach(done => {
    newUser = new User({ name: 'Umer' });
    newUser.save().then(() => {
      done();
    });
  });

  it('model instance delete', done => {
    newUser
      .delete()
      .then(() => User.findOne({ _id: newUser._id }))
      .then(user => {
        assert(user === null);
        done();
      });
  });

  it('class method findOneAndDelete', done => {
    User.findOneAndDelete({ name: newUser.name })
      .then(() => User.findOne({ name: newUser.name }))
      .then(user => {
        assert(user === null);
        done();
      });
  });

  it('class method findByIdAndDelete', done => {
    User.findByIdAndDelete(newUser._id)
      .then(() => User.findById(newUser._id))
      .then(user => {
        assert(user === null);
        done();
      });
  });

  it('class method deleteMany', done => {
    User.deleteMany({ name: newUser.name })
      .then(() => User.findOne({ _id: newUser._id }))
      .then(user => {
        assert(user === null);
        done();
      });
  });

  it('class method deleteOne', done => {
    User.deleteOne({ id: newUser._id })
      .then(() => User.findOne({ _id: newUser._id }))
      .then(user => {
        assert(user === null);
        done();
      });
  });
});

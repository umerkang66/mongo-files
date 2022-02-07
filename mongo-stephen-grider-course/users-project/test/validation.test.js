const assert = require('assert');
const User = require('../src/users');

describe('Validating records', () => {
  // Make sure to add it before running any tests on mongoose, because if we not "ns not found" error will occur, because before every test mongoose will try to drop the collection, because that is what we have specified in the helper.test.js
  beforeEach(done => {
    User.create({ name: 'Umer', postCount: 2 }).then(() => done());
  });

  // We are not saving the
  it("requires a user's name", done => {
    const user = new User({ name: undefined });
    const validationResult = user.validateSync();
    // This is where error message property is
    const { message } = validationResult.errors.name;

    assert(message === 'Name is required');
    done();
  });

  it("requires a user's name longer than 2 characters", done => {
    const user = new User({ name: 'Um', postCount: 2 });
    const validationResult = user.validateSync();
    // This is where error message property is
    const { message } = validationResult.errors.name;

    assert(message === 'Name must be longer than 2 characters');
    done();
  });

  it('disallows invalid records from being saved', done => {
    const user = new User({ name: 'Um' });
    user.save().catch(validationResult => {
      const { message } = validationResult.errors.name;
      assert(message === 'Name must be longer than 2 characters');

      done();
    });
  });
});

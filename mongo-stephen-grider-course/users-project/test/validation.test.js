const assert = require('assert');
const User = require('../src/user');

describe('Validating records', () => {
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
    const user = new User({ name: 'Um' });
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

// assert function helps us with insertion (comparisons)
const assert = require('assert');
const User = require('../src/user');

// The purpose of this string is to modify the testing feedback that we get from mocha
describe('Creating records', () => {
  // In describe block there will be a lot of describe functions
  // Whenever mocha sees "it" block, mocha run it as a test
  it('saves a user', done => {
    // "assert" function requires us to pass the boolean value, if the value is true, the test pass, otherwise the test fails

    // This instance of user has ton of functions one of which is to save the user
    const newUser = new User({ name: 'Umer' });

    // Save call will return a promise
    newUser.save().then(() => {
      // newUser has isNew property, that is first true, and be set to the false when it is saved in the database, and if we are running it after saving, here newItem should be false
      assert(!newUser.isNew);
      // if assert is true, user is successfully saved to the database

      // Done is available it block, it means the test is over and move to the next test
      done();
    });
  });
});

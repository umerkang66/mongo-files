const assert = require('assert');
const User = require('../src/user');

describe('Virtual Types', () => {
  beforeEach(done => {
    // We have add a user in the db, because before running every test, mocha will delete the existing user collection, if we don't have a collection, it will give error, so we add a collection
    const newUser = new User({ name: 'Kang' });
    newUser.save().then(() => {
      done();
    });
  });

  it('postCount returns number of posts', async () => {
    // When using the async function, no need to call the done callback
    const postTitle = 'PostTitle';

    // Creating the new user
    const newUser = new User({ name: 'Umer', posts: [{ title: postTitle }] });
    await newUser.save();

    // Fetching the created user
    const user = await User.findOne({ name: 'Umer' });
    assert(user.postCount === 1);
  });
});

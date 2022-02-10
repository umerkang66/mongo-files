const assert = require('assert');
const User = require('../src/user');

describe('Virtual Types', () => {
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

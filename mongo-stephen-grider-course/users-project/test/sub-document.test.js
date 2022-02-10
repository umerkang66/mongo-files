const assert = require('assert');
const User = require('../src/user');

describe('Sub Document', () => {
  it('can create a sub document', done => {
    const postTitle = 'PostTitle';

    const newUser = new User({ name: 'Umer', posts: [{ title: postTitle }] });

    newUser
      .save()
      .then(() => User.findOne({ name: 'Umer' }))
      .then(user => {
        assert(user.posts[0].title === postTitle);
        done();
      });
  });

  it('can add sub documents to an existing records', async () => {
    // If we are using async function we don't have to call done, async function is going to return a promise, that mocha is going to detect
    const newUser = new User({ name: 'Umer', posts: [] });
    await newUser.save();
    const user = await User.findOne({ name: 'Umer' });

    const newPost = 'New Post';

    // pushing the record is actually pushing the record in posts in memory, it does not save in the database
    user.posts.push({ title: newPost });
    await user.save();

    const updatedUser = await User.findOne({ name: 'Umer' });

    assert(updatedUser.posts[0].title === newPost);
  });

  it('can remove an existing sub document', async () => {
    const postTitle = 'PostTitle';

    // Creating a user
    const newUser = new User({ name: 'Umer', posts: [{ title: postTitle }] });
    await newUser.save();

    // Fetching that user
    const user = await User.findOne({ name: 'Umer' });
    // This remove magic is injected by mongoose, and when we remove sub document by remove method it does save it in the database (it does when we use it on the document)
    user.posts[0].remove();
    await user.save();

    // Fetch the updated user
    const updatedUser = await User.findOne({ name: 'Umer' });

    // Check if posts array is empty
    assert(updatedUser.posts.length === 0);
  });
});

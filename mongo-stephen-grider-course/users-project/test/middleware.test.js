const assert = require('assert');
const User = require('../src/user');
const BlogPost = require('../src/blogPost');

describe('Middleware', () => {
  let newUser, blogPost;

  beforeEach(done => {
    newUser = new User({ name: 'Umer' });

    blogPost = BlogPost({ title: 'JS is Great', content: 'Yep, it really is' });

    // Associate documents with other documents
    newUser.blogPosts.push(blogPost);

    // Save on the DB
    Promise.all([newUser.save(), blogPost.save()]).then(() => {
      done();
    });
  });

  it('user clean up dangling blogPosts on delete', async () => {
    await newUser.delete();
    // Finding the number of blogPost collections in DB
    const count = await BlogPost.count();
    assert(count === 0);
  });
});

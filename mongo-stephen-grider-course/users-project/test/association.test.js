const assert = require('assert');
const User = require('../src/user');
const Comment = require('../src/comment');
const BlogPost = require('../src/blogPost');

describe('Associations', () => {
  let newUser, blogPost, comment;

  beforeEach(done => {
    newUser = new User({ name: 'Umer' });

    blogPost = BlogPost({ title: 'JS is Great', content: 'Yep, it really is' });

    comment = new Comment({ content: 'Congrats on great post' });

    // Associate documents with other documents
    newUser.blogPosts.push(blogPost);
    blogPost.comments.push(comment);
    comment.user = newUser;

    // Save on the DB
    Promise.all([newUser.save(), blogPost.save(), comment.save()]).then(() => {
      done();
    });
  });

  // it.only() will only run this test, and not all the others
  it('saves a relation between a user and a blogPost', done => {
    User.findOne({ name: 'Umer' })
      // populating the blogPosts in the User object
      .populate('blogPosts')
      .then(user => {
        assert(user.blogPosts[0].title === 'JS is Great');
        done();
      });
  });
});

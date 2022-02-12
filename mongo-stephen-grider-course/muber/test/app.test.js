const assert = require('assert');
// importing name "request" from supertest is just a convention
const request = require('supertest');
const app = require('../app');

describe('The express app', () => {
  it('handles a GET request to /api', done => {
    // This is how we use supertest
    request(app)
      .get('/api')
      .end((err, res) => {
        assert(res.body.hi === 'from umer');
        done();
      });
  });
});

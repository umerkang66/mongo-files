const assert = require('assert');
// importing name "request" from supertest is just a convention
const request = require('supertest');
const app = require('../../app');

describe('Driver controller', () => {
  it('post to /api/drivers, creates a new driver', done => {
    const email = 'test@test.com';

    request(app)
      .post('/api/drivers')
      // For sending json data in post request
      .send({ email: 'test@test.com' })
      .end((err, res) => {
        assert(res.body.email === email);
        done();
      });
  });
});

const assert = require('assert');
const mongoose = require('mongoose');
// importing name "request" from supertest is just a convention
const request = require('supertest');

const app = require('../../app');
const Driver = mongoose.model('driver');
// Don't require the Driver model because, mocha tries to run this file multiple times, and it can required the Driver model multiple times, thus creating the driver model multiple times, which is not ideal

describe('Driver controller', () => {
  it('Post to /api/drivers creates a new driver', done => {
    Driver.count().then(count => {
      request(app)
        .post('/api/drivers')
        .send({ email: 'test@test.com' })
        .end(() => {
          Driver.count().then(newCount => {
            assert(count + 1 === newCount);
            done();
          });
        });
    });
  });

  it('PUT to /api/drivers/id edits an existing driver', done => {
    const driver = new Driver({ email: 't@t.com', driving: false });

    driver.save().then(() => {
      request(app)
        .put(`/api/drivers/${driver._id}`)
        .send({ driving: true })
        .end(() => {
          Driver.findOne({ email: 't@t.com' }).then(driver => {
            assert(driver.driving === true);
            done();
          });
        });
    });
  });

  it('DELETE to /api/drivers/id delete an existing driver', done => {
    const driver = new Driver({ email: 't1@t.com', driving: false });

    driver.save().then(() => {
      request(app)
        .delete(`/api/drivers/${driver._id}`)
        .end(() => {
          Driver.findOne({ email: 't1@t.com' }).then(driver => {
            // After deleting the document becomes "null", "!undefined"
            assert(driver === null);
            done();
          });
        });
    });
  });
});

import express from 'express';
import request from 'supertest';
import should from 'should';
import usersRoute from '../api/routes/users';

const app = express();
app.use(express.json());

app.use('/api/v1/users', usersRoute);

describe('Tests Signup route', () => {
  it('check requires feilds', (done) => {
    request(app)
      .post('/api/v1/users/auth/signup')
      .send({
        email: 'job@gmail.com',
      })
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.message.should.equal('"firstName" is required');
        done();
      });
  });
  it('checks input length', (done) => {
    request(app)
      .post('/api/v1/users/auth/signup')
      .send({
        email: 'an',
        firstName: 'andy',
        lastName: 'mona',
        password: 'january',
        address: 'hoima',
      })
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.message.should.be.eql('"email" must be a valid email');
        done();
      });
  });
});

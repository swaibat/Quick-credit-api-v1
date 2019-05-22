import express from 'express';
import request from 'supertest';
import should from 'should';
import usersRoute from '../api/routes/users';
import {testData} from '../api/models/users';

const app = express();
app.use(express.json());

app.use('/api/v1/users', usersRoute);

describe('Tests Signup route', () => {
  it('check requires feilds', (done) => {
    request(app)
      .post('/api/v1/users/auth/signup')
      .send(testData[0])
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
      .send(testData[1])
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.message.should.be.eql('"email" must be a valid email');
        done();
      });
  });

  it('checks for username existance', (done) => {
    request(app)
      .post('/api/v1/users/auth/signup')
      .send(testData[3])
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(409);
        res.body.message.should.equal(`user ${testData[3].email} already exists `);
        done();
      });
  });

  it('checks if user has been posted', (done) => {
    request(app)
      .post('/api/v1/users/auth/signup')
      .send(testData[4])
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(201);
        done();
      });
  });
});

describe('Users Signin', () => {
  it('check if user data exists', (done) => {
    request(app)
      .post('/api/v1/users/auth/signin')
      .send({
        email: 'bob@gmail.com',
        password: 'anderson',
      })
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.should.have.property('email');
        res.body.should.have.property('token');
        done();
      });
  });

  it('checks if username and password match', (done) => {
    request(app)
      .post('/api/v1/users/auth/signin')
      .send({
        email: 'bob@gmail.com',
        password: 'anderso',
      })
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(401);
        res.body.message.should.equal('Auth failed,invalid details');
        done();
      });
  });
});

describe('verify User', () => {
  let token = '';

  before((done) => {
    request(app)
      .post('/api/v1/users/auth/signin')
      .send({
        email: 'job@gmail.com',
        password: 'december',
      })
      .end((err, res) => {
        const result = JSON.parse(res.text);
        token = result.token;
        done();
      });
  });
  it('checks user verification', (done) => {
    request(app)
      .patch('/api/v1/users/andy@gmail.com/verify')
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.should.have.property('status', 'verified');
        done();
      });
  });
  it('checks user to verify is not found', (done) => {
    request(app)
      .patch('/api/v1/users/and@gmail.com/verify')
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(404);
        res.body.message.should.equal('user with and@gmail.com not Found');
        done();
      });
  });
});

describe('verify User non admin', () => {
  let token = '';

  before((done) => {
    request(app)
      .post('/api/v1/users/auth/signin')
      .send({
        email: 'andy@gmail.com',
        password: 'january',
      })
      .end((err, res) => {
        const result = JSON.parse(res.text);
        token = result.token;
        done();
      });
  });
  it('checks user verification if user not admin', (done) => {
    request(app)
      .patch('/api/v1/users/andy@gmail.com/verify')
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(403);
        res.body.message.should.equal('Forbidden Only Admin has access');
        done();
      });
  });
});

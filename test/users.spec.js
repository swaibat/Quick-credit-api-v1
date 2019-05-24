import express from 'express';
import request from 'supertest';
import should from 'should';
import usersRoute from '../api/routes/users';

const app = express();
app.use(express.json());

app.use('/api/v1/users', usersRoute);
const testData = {
  email: 'job@gmail.com', firstName: 'andy', lastName: 'mona', password: 'january', address: 'hoima',
};
const testData1 = {
  email: 'job4e2er@gmail.com', firstName: 'andy', lastName: 'mona', password: 'january', address: 'hoima',
};
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
  it('checks for username existance', (done) => {
    request(app)
      .post('/api/v1/users/auth/signup')
      .send(testData)
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(409);
        res.body.message.should.equal('user already exists');
        done();
      });
  });
  it('checks if user has been posted', (done) => {
    request(app)
      .post('/api/v1/users/auth/signup')
      .send(testData1)
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(201);
        done();
      });
  });
  it('check if user signin', (done) => {
    request(app)
      .post('/api/v1/users/auth/signin')
      .send({
        email: 'job@gmail.com',
        password: 'january',
      })
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.should.have.property('status');
        done();
      });
  });
  it('checks if username and password match', (done) => {
    request(app)
      .post('/api/v1/users/auth/signin')
      .send({
        email: 'job@gmail.com',
        password: 'anderso',
      })
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(401);
        res.body.message.should.equal('wrong username or password');
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
        password: 'january',
      })
      .end((err, res) => {
        const result = JSON.parse(res.text);
        token = result.token;
        done();
      });
  });
  it('checks user verification', (done) => {
    request(app)
      .patch('/api/v1/users/job7@gmail.com/verify')
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(403);
        // res.body.should.have.property('status', 'verified');
        done();
      });
  });
  it('checks user to verify is not found', (done) => {
    request(app)
      .patch('/api/v1/users/and@gmail.com/verify')
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(403);
        res.body.message.should.equal('Forbidden Only Admin has access');
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
        email: 'job6@gmail.com',
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
        res.body.should.equal('Forbidden Only Admin has access');
        done();
      });
  });
});

import express from 'express';
import request from 'supertest';
import should from 'should';
import usersRoute from '../api/routes/users'
import {testdata, testlength} from '../api/models/dummyUsers';

const app = express();
app.use(express.json());

app.use('/api/v1/users', usersRoute);

  describe('Test Signup route', function() {
    it('check requires feilds', function(done) {
      request(app)
        .post('/api/v1/users/auth/signup')
        .send({email: "om"})
        .set('Accept', 'application/json')
        .expect({"message": "\"firstName\" is required"})
        .expect(400,done);
    });
    it('check input length', function(done) {
      request(app)
        .post('/api/v1/users/auth/signup')
        .send(testlength)
        .set('Accept', 'application/json')
        .expect({"message": "\"email\" length must be at least 3 characters long"})
        .expect(400,done);
    });

    it('check if user is posted', function(done) {
      request(app)
        .post('/api/v1/users/auth/signup')
        .send(testdata)
        .set('Accept', 'application/json')
        .expect(201,done);
    });

    it('chek if user exists', function(done) {
      request(app)
        .post('/api/v1/users/auth/signup')
        .send(testdata)
        .set('Accept', 'application/json')
        .expect(409,done);
    });

  });

  describe('User Signin', function() {
    it('check if user data exists', function(done) {
      request(app)
        .post('/api/v1/users/auth/signin')
        .send({
          "email": "bob@gmail.com",
          "password": "anderson"
        })
        .set('Accept', 'application/json')
        .end(function (err, res) {
          res.status.should.equal(200);
          res.body.data.should.have.property('email');
          res.body.data.should.have.property('token');
          done();
        });
    });

    it('check for wrong details', function(done) {
      request(app)
        .post('/api/v1/users/auth/signin')
        .send({
          "email": "b@gmail.com",
          "password": "anderson"
        })
        .set('Accept', 'application/json')
        .end(function (err, res) {
          res.status.should.equal(500);
          done();
        });
    });
  });
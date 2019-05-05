import express from 'express';
import request from 'supertest';
import should from 'should';
import usersRoute from '../api/routes/users'
import {users,testData} from '../api/models/dummyUsers';

const app = express();
app.use(express.json());

app.use('/api/v1/users', usersRoute);

  describe('Test Signup route', function() {
    it('check requires feilds', function(done) {
      request(app)
        .post('/api/v1/users/auth/signup')
        .send(testData[0])
        .set('Accept', 'application/json')
        .end(function (err, res) {
          res.status.should.equal(400);
          res.body.message.should.equal("\"firstName\" is required");
          done();
        });
    });
    it('check input length', function(done) {
      request(app)
        .post('/api/v1/users/auth/signup')
        .send(testData[1])
        .set('Accept', 'application/json')
        .end(function (err, res) {
          res.status.should.equal(400);
          res.body.message.should.be.eql("\"email\" length must be at least 3 characters long")
          done();
        });
    });

    it('check for username existance', function(done) {
      request(app)
        .post('/api/v1/users/auth/signup')
        .send(testData[3])
        .set('Accept', 'application/json')
        .end(function (err, res) {
          res.status.should.equal(409);
          res.body.message.should.equal(`user ${testData[3].email} already exists `)
          done();
        });
    });

    it('chek if user has been posted', function(done) {
      request(app)
        .post('/api/v1/users/auth/signup')
        .send(testData[4])
        .set('Accept', 'application/json')
        .end(function (err, res) {
          res.status.should.equal(201);
          done();
        });
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
          res.body.should.have.property('email');
          res.body.should.have.property('token');
          done();
        });
    });

    it('check if username and password match', function(done) {
      request(app)
        .post('/api/v1/users/auth/signin')
        .send({
          "email": "bob@gmail.com",
          "password": "anderso"
        })
        .set('Accept', 'application/json')
        .end(function (err, res) {
          res.status.should.equal(401);
          res.body.message.should.equal('Auth failed,invalid details')
          done();
        });
    });
  });
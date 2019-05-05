import express from 'express';
import request from 'supertest';
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
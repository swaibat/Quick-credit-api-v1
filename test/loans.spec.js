import express from 'express';
import request from 'supertest';
import should from 'should';
import loansRoute from '../api/routes/loans'
import usersRoute from '../api/routes/users'
// import app from '../index';

const app = express();
app.use(express.json());

app.use('/api/v1/loans', loansRoute);
app.use('/api/v1/users', usersRoute);

  describe('Test Post Loans', function() {
    it('checks if loan posts', function(done) {
      request(app)
        .post('/api/v1/loans')
        .send({"user": "joelb@gmail.com"})
        .set('Accept', 'application/json')
        .end(function (err, res) {
            res.status.should.equal(201);
            res.body.should.have.property('status','pending');
        done()
        })
    });
    it('checks if user requested for loan before', function(done) {
      request(app)
        .post('/api/v1/loans')
        .send({"user": "job@gmail.com"})
        .set('Accept', 'application/json')
        .end(function (err, res) {
            res.status.should.equal(409);
            res.body.message.should.equal("You already applied for a loan. you can request for ​only​ one loan at a time ")
        done()
        })
    });
});

describe('Test Loans Get methods', function() {

  it('checks if No Loans repayment found', function(done) {
    request(app)
      .get('/api/v1/loans/QK-99588A9795L3/repayments')
      .set('Accept', 'application/json')
      .end(function (err, res) {
          res.status.should.equal(404);
          res.body.message.should.equal('No loan repayment history found');
      done()
      })
  });
  it('checks if repayment history is sent ', function(done) {
    request(app)
      .get('/api/v1/loans/QK-588A979LL3M/repayments')
      .set('Accept', 'application/json')
      .end(function (err, res) {
          res.status.should.equal(200);
          res.body[0].should.have.property('amount').which.is.a.Number()
          res.body[0].should.have.property('monthlyInstallment').which.is.a.Number()
      done()
      })
  });
});

describe('Accessible by admin Only', function() {
  var token = '';

before(function(done) {
  request(app)
    .post('/api/v1/users/auth/signin')
    .send({
      email : "job@gmail.com",
      password: "december"
    })
    .end(function(err, res) {
      var result = JSON.parse(res.text);
      token = result.token;
      done();
    });
});
it('checks if there are  Loans Applications', function(done) {
    request(app)
      .get('/api/v1/loans')
      .set('Authorization', 'Bearer ' + token)
      .set('Accept', 'application/json')
      .end(function (err, res) {
          res.status.should.equal(200);
          // res.body.message.should.equal('No loan repayment history found');
      done()
      })
  });
});

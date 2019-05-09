import express from 'express';
import request from 'supertest';
import should from 'should';
import loansRoute from '../api/routes/loans';
import usersRoute from '../api/routes/users';
// import app from '../index';

const app = express();
app.use(express.json());

app.use('/api/v1/loans', loansRoute);
app.use('/api/v1/users', usersRoute);


describe('Protected Routes Accessible with users with Tokens', () => {
  let token = '';
  before((done) => {
    request(app)
      .post('/api/v1/users/auth/signin')
      .send({
        email: 'bob@gmail.com',
        password: 'anderson',
      })
      .end((err, res) => {
        const result = JSON.parse(res.text);
        token = result.token;
        done();
      });
  });

  it('checks if loan posts', (done) => {
    request(app)
      .post('/api/v1/loans')
      .send({ user: 'joelb@gmail.com' })
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(201);
        res.body.should.have.property('status', 'pending');
        done();
      });
  });
  it('checks if user requested for loan before', (done) => {
    request(app)
      .post('/api/v1/loans')
      .send({ user: 'job@gmail.com' })
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(409);
        res.body.message.should.equal('You already applied for a loan. you can request for ​only​ one loan at a time ');
        done();
      });
  });
  it('checks if No Loans repayment found', (done) => {
    request(app)
      .get('/api/v1/loans/QK-99588A9795L3/repayments')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        res.status.should.equal(404);
        res.body.message.should.equal('No loan repayment history found');
        done();
      });
  });
  it('checks if repayment history is sent ', (done) => {
    request(app)
      .get('/api/v1/loans/QK-588A979LL3M/repayments')
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(200);
        res.body[0].should.have.property('amount').which.is.a.Number();
        res.body[0].should.have.property('monthlyInstallment').which.is.a.Number();
        done();
      });
  });
});

describe('Accessible by admin Only', () => {
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
  it('checks if there are  Loans Applications', (done) => {
    request(app)
      .get('/api/v1/loans')
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(200);
        done();
      });
  });
  it('gets specific loan by id', (done) => {
    request(app)
      .get('/api/v1/loans/QK-588A979LL3M')
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.should.have.property('amount').which.is.a.Number();
        done();
      });
  });
  it('checks not repaid loans', (done) => {
    request(app)
      .get('/api/v1/loans?status=approved&repaid=false')
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(200);
        res.body[0].should.have.property('status', 'approved');
        res.body[0].should.have.property('repaid', false);
        done();
      });
  });
  it('checks for repaid loans', (done) => {
    request(app)
      .get('/api/v1/loans?status=approved&repaid=true')
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(200);
        res.body[0].should.have.property('status', 'approved');
        res.body[0].should.have.property('repaid', true);
        done();
      });
  });
  it('checks if query is defined', (done) => {
    request(app)
      .get('/api/v1/loans?status=approved&repaid=true')
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(200);
        done(); 
      });
  });
  it('checks if query is not defined', (done) => {
    request(app)
      .get('/api/v1/loans?status=approved&repaid=true')
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(200);
        done();
      });
  });
  it('Approves user (Admin)', (done) => {
    request(app)
      .patch('/api/v1/loans/QK-588A979nL3M/approve')
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.should.have.property('status', 'approved');
        done();
      });
  });
  it('Rejects user (Admin)', (done) => {
    request(app)
      .patch('/api/v1/loans/QK-588A979nL3M/reject')
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.should.have.property('status', 'rejected');
        done();
      });
  });
});

describe('Other ERRORS Tests', () => {
  it('test 404 erorr', (done) => {
    request(app)
      .get('/api/v1/loa')
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(404);
        done();
      });
  });
});
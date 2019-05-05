import express from 'express';
import request from 'supertest';
import should from 'should';
import loansRoute from '../api/routes/loans'
import {loans} from '../api/models/dummyloans';

const app = express();
app.use(express.json());

app.use('/api/v1/loans', loansRoute);

  describe('Test Post Loans', function() {
    it('check if loan posts', function(done) {
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
    it('check if user requested for loan before', function(done) {
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

/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import db from '../data/db';

const { expect } = chai;

chai.use(chaiHttp);

describe('Request Routes', () => {
  let userToken = '';
  before((done) => {
    chai
      .request(app)
      .post('/api/v1/auth/login')
      .send({
        username: 'easy',
        password: '123456',
      })
      .end((err2, res) => {
        const { token } = res.body.data;

        userToken = token;
        done();
      });
  });

  it('creates a request and return request details', (done) => {
    chai
      .request(app)
      .post('/api/v1/requests')
      .send({
        pickup_time: '10pm',
        pickup_date: '2019-09-12',
        name: 'Request1',
        food_type: 'Beverage',
        comment: 'No comment',
        instruction: 'Call before coming',
      })
      .set('Authorization', userToken)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.equal('Request created successfully');
        expect(res.body.status).to.equal('success');
        done();
      });
  });

  it('returns server error', (done) => {
    chai
      .request(app)
      .post('/api/v1/requests')
      .send({
        pickup_time: '10pm',
        pickup_date: '2019-09-12',
        name: 1234,
        food_type: 'Beverage',
        comment: 'No comment',
        instruction: 'Call before coming',
      })
      .set('Authorization', userToken)
      .end((err, res) => {
        expect(res).to.have.status(500);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.equal('Unable to create request');
        expect(res.body.status).to.equal('error');
        done();
      });
  });

  //   it('return validation error if no data is sent', (done) => {
  //     chai
  //       .request(app)
  //       .post('/api/v1/auth/register')

  //       .end((err, res) => {
  //         expect(res).to.have.status(400);
  //         expect(res.body).to.be.an('object');
  //         expect(res.body.status).to.equal('error');
  //         expect(res.body.errors.email).to.equal('Email field is required');
  //         expect(res.body.errors.password).to.equal('Password field is required');
  //         expect(res.body.errors.name).to.equal('Name field is required');
  //         expect(res.body.errors.type).to.equal('Type field is required');
  //         done();
  //       });
  //   });

  
});

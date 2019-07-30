/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

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

  it('return validation error if no data is sent', (done) => {
    chai
      .request(app)
      .post('/api/v1/requests')
      .set('Authorization', userToken)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal('error');
        expect(res.body.errors.food_type).to.equal(
          'Food Type field is required',
        );
        expect(res.body.errors.pickup_date).to.equal(
          'Pickup Date field is required',
        );
        expect(res.body.errors.name).to.equal('Name field is required');
        expect(res.body.errors.pickup_time).to.equal(
          'Pickup Time field is required',
        );
        done();
      });
  });

  it('return no token provided', (done) => {
    chai
      .request(app)
      .post('/api/v1/requests')
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal('error');
        expect(res.body.message).to.equal('No Token Provided');
        done();
      });
  });

  it('return invalid token provided', (done) => {
    const editedToken = `${userToken}chioi`;
    console.log(editedToken);
    chai
      .request(app)
      .post('/api/v1/requests')
      .set('Authorization', editedToken)
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal('error');
        expect(res.body.message).to.equal('Invalid Token Provided');
        done();
      });
  });
});

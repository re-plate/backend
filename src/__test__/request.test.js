/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

const { expect } = chai;

chai.use(chaiHttp);

describe('Request Routes', () => {
  let userToken = '';
  let volunteerToken = '';
  before((done) => {
    chai
      .request(app)
      .post('/api/v1/auth/login')
      .send({
        username: 'easy',
        password: '123456',
      })
      .end((err, res) => {
        const { token } = res.body.data;
        userToken = token;

        chai
          .request(app)
          .post('/api/v1/auth/login')
          .send({
            username: 'volunteer',
            password: '123456',
          })
          .end((err2, res2) => {
            const token2 = res2.body.data.token;
            volunteerToken = token2;
            done();
          });
      });
  });

  it('return request not found', (done) => {
    chai
      .request(app)
      .get('/api/v1/requests')
      .set('Authorization', userToken)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal('error');
        expect(res.body.message).to.equal('No Request Found');
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

  it('return requests that has been created', (done) => {
    chai
      .request(app)
      .get('/api/v1/requests')
      .set('Authorization', userToken)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal('success');
        expect(res.body.message).to.equal('Requests gotten successfully');
        done();
      });
  });

  it('return gets a request by id', (done) => {
    chai
      .request(app)
      .get('/api/v1/requests/1')
      .set('Authorization', userToken)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal('success');
        expect(res.body.message).to.equal('Request gotten successfully');
        done();
      });
  });

  it('return should return forbidden because user does not have right access', (done) => {
    chai
      .request(app)
      .get('/api/v1/requests/all')
      .set('Authorization', userToken)
      .end((err, res) => {
        expect(res).to.have.status(403);
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal('error');
        expect(res.body.message).to.equal(
          'You are not allowed to perform this action',
        );
        done();
      });
  });

  it('return return all reuqests for volunteers', (done) => {
    chai
      .request(app)
      .get('/api/v1/requests/all')
      .set('Authorization', volunteerToken)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal('success');
        expect(res.body.message).to.equal('Request gotten successfully');
        done();
      });
  });

  it('return no request found', (done) => {
    chai
      .request(app)
      .get('/api/v1/requests/20')
      .set('Authorization', userToken)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal('error');
        expect(res.body.message).to.equal(
          'No Request Found or You do not have the right access',
        );
        done();
      });
  });

  it('updates a request', (done) => {
    chai
      .request(app)
      .put('/api/v1/requests/1')
      .set('Authorization', userToken)
      .send({
        pickup_time: '10pm',
        pickup_date: '2019-09-12',
        name: 'Request',
        food_type: 'Fruits',
        comment: 'No comment',
        instruction: 'Call before coming',
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal('success');
        expect(res.body.message).to.equal('Request updated successfully');
        done();
      });
  });

  it('accepts a request', (done) => {
    chai
      .request(app)
      .post('/api/v1/requests/1/action')
      .set('Authorization', volunteerToken)
      .send({
        status: '1',
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal('success');
        expect(res.body.message).to.equal('Request accepted successfully');
        done();
      });
  });

  it('returns request accepted already', (done) => {
    chai
      .request(app)
      .post('/api/v1/requests/1/action')
      .set('Authorization', volunteerToken)
      .send({
        status: '1',
      })
      .end((err, res) => {
        expect(res).to.have.status(409);
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal('success');
        expect(res.body.message).to.equal('Request has been accepted already, Kindly search for pending request(s)');
        done();
      });
  });

  it('return deletes a request', (done) => {
    chai
      .request(app)
      .delete('/api/v1/requests/1')
      .set('Authorization', userToken)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal('success');
        expect(res.body.message).to.equal('Request deleted successfully');
        done();
      });
  });
});

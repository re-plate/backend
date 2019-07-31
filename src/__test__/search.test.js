/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

const { expect } = chai;

chai.use(chaiHttp);

describe('Search Routes', () => {
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

  it('searches for a business', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/register')
      .send({
        username: 'testcompany',
        email: 'testcompany@gmail.com',
        name: 'My Venture',
        password: '123456',
        type: '1',
      })
      .set('Authorization', userToken)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.equal('User registered successfully');
        expect(res.body.status).to.equal('success');

        chai
          .request(app)
          .get('/api/v1/search/business?name=Ven')
          .set('Authorization', volunteerToken)
          .end((err2, res2) => {
            expect(res2).to.have.status(200);
            expect(res2.body).to.be.an('object');
            expect(res2.body.message).to.equal('Business gotten successfully');
            expect(res2.body.status).to.equal('success');
            done();
          });
      });
  });

  it('returns business not found', (done) => {
    chai
      .request(app)
      .get('/api/v1/search/business?name=mybusiness')
      .set('Authorization', volunteerToken)
      .end((err, res) => {
        expect(res2).to.have.status(404);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.equal('No business found with search parameter');
        expect(res.body.status).to.equal('error');
        done();
      });
  });
});

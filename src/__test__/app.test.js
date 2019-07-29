/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

const { expect } = chai;

chai.use(chaiHttp);

describe('Server', () => {
  it('indicates server is up', (done) => {
    chai
      .request(app)
      .get('/')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.equal('Welcome to Replate API 👋🏾');
        expect(res.body.status).to.equal('success');
        done();
      });
  });

  it('returns route not found', (done) => {
    chai
      .request(app)
      .get('/me')
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.equal('Route Not found');
        expect(res.body.status).to.equal('error');
        done();
      });
  });
});

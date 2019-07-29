/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import db from '../data/db';

const { expect } = chai;

chai.use(chaiHttp);

describe('Auth Routes', () => {
  beforeEach((done) => {
    db('users')
      .truncate()
      .then(() => done());
  });

  it('creates a user and return user details', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/register')
      .send({
        username: 'easybuoys',
        email: 'eze@gmail.com',
        name: 'Ezekiel Ekunola',
        password: '123456',
        type: '1',
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.equal('User registered successfully');
        expect(res.body.status).to.equal('success');
        done();
      });
  });

  it('return validation error if no data is sent', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/register')

      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal('error');
        expect(res.body.errors.email).to.equal('Email field is required');
        expect(res.body.errors.password).to.equal('Password field is required');
        expect(res.body.errors.name).to.equal('Name field is required');
        expect(res.body.errors.type).to.equal('Type field is required');
        done();
      });
  });

  it('return username already exist', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/register')
      .send({
        username: 'easybuoys',
        email: 'eze@gmail.com',
        name: 'Ezekiel Ekunola',
        password: '123456',
        type: '1',
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.equal('User registered successfully');
        expect(res.body.status).to.equal('success');

        chai
          .request(app)
          .post('/api/v1/auth/register')
          .send({
            username: 'easybuoys',
            email: 'eze@gmail.com',
            name: 'Ezekiel Ekunola',
            password: '123456',
            type: '1',
          })
          .end((err2, res2) => {
            expect(res2).to.have.status(409);
            expect(res2.body).to.be.an('object');
            expect(res2.body.status).to.equal('error');
            expect(res2.body.message).to.equal('Username already taken');
            done();
          });
      });
  });

  it('return email already exist', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/register')
      .send({
        username: 'easybuoys',
        email: 'eze@gmail.com',
        name: 'Ezekiel Ekunola',
        password: '123456',
        type: '1',
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.equal('User registered successfully');
        expect(res.body.status).to.equal('success');

        chai
          .request(app)
          .post('/api/v1/auth/register')
          .send({
            username: 'easybuoyss',
            email: 'eze@gmail.com',
            name: 'Ezekiel Ekunola',
            password: '123456',
            type: '1',
          })
          .end((err2, res2) => {
            expect(res2).to.have.status(409);
            expect(res2.body).to.be.an('object');
            expect(res2.body.status).to.equal('error');
            expect(res2.body.message).to.equal('Email already taken');
            done();
          });
      });
  });
});

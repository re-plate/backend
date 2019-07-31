/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';

import {
  generateToken,
  hashPassword,
  verifyPassword,
  convertStatus,
} from '../utils';

const { expect } = chai;

chai.use(chaiHttp);

describe('Utils Validation', () => {
  it('returns token', (done) => {
    const token = generateToken({
      id: '1',
    });

    expect(token).to.be.a('string');

    done();
  });

  it('hashes a password', (done) => {
    const hashedPassword = hashPassword('123456');
    expect(hashedPassword).to.be.a('string');

    done();
  });

  it('verifies password', (done) => {
    const password = '123456';
    const hashedPassword = hashPassword(password);
    expect(hashedPassword).to.be.a('string');

    const validPassword = verifyPassword(password, hashedPassword);
    expect(validPassword).to.equals(true);

    done();
  });

  it('converts status of a request', (done) => {
    const request = [{ status: 0 }, { status: 1 }];
    const convertedRequest = convertStatus(request);
    expect(convertedRequest[0].status).to.equals('Pending');
    expect(convertedRequest[1].status).to.equals('Accepted');
    done();
  });

  it('converts status of a request', (done) => {
    const request = { status: 2 };
    const convertedRequest = convertStatus(request);
    expect(convertedRequest.status).to.equals('Rejected');
    done();
  });
});

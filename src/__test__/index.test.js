/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';

import { generateToken, hashPassword, verifyPassword } from '../utils';

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
    console.log(validPassword);
    expect(validPassword).to.equals(true);

    done();
  });
});

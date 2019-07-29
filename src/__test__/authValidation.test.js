/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';

import { validateSignupInput, validateLoginInput } from '../validations/auth';

const { expect } = chai;

chai.use(chaiHttp);

describe('Signup Validation', () => {
  it('returns empty object because all validation is passed', (done) => {
    const result = validateSignupInput({
      email: 'example@gmail.com',
      password: '123456',
      name: 'Example',
      type: '2',
      username: 'example',
    });
    expect(result.isValid).to.equal(true);
    expect(Object.keys(result.errors).length).to.equal(0);
    done();
  });

  it('returns object of validation required', (done) => {
    const result = validateSignupInput({});
    expect(result.isValid).to.equal(false);
    expect(Object.keys(result.errors).length).to.be.greaterThan(0);
    expect(result.errors.email).to.equal('Email field is required');
    expect(result.errors.password).to.equal('Password field is required');
    expect(result.errors).to.be.an('object');
    done();
  });

  it('returns object of validation required', (done) => {
    const result = validateSignupInput({
      name: 'eze1er',
      email: 'a@',
      password: '12',
      type: 4,
    });
    expect(result.isValid).to.equal(false);
    expect(Object.keys(result.errors).length).to.be.greaterThan(0);
    expect(result.errors.name).to.equal('Name cannot contain number(s)');
    expect(result.errors.email).to.equal('Email is invalid');
    expect(result.errors.password).to.equal(
      'Password must be at least 6 characters',
    );
    expect(result.errors.type).to.equal(
      'Invalid Type. Type cannot be greater than 2',
    );
    expect(result.errors).to.be.an('object');
    done();
  });
});

describe('Login Validation', () => {
  it('returns empty object because all validation is passed', (done) => {
    const result = validateLoginInput({
      username: 'easybuoy',
      password: '123456',
    });
    expect(result.isValid).to.equal(true);
    expect(Object.keys(result.errors).length).to.equal(0);
    done();
  });

  it('returns object of validation required', (done) => {
    const result = validateLoginInput({});
    expect(result.isValid).to.equal(false);
    expect(Object.keys(result.errors).length).to.be.greaterThan(0);
    expect(result.errors.email).to.equal('Email field is required');
    expect(result.errors.password).to.equal('Password field is required');
    expect(result.errors).to.be.an('object');
    done();
  });
});

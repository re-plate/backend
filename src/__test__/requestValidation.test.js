/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';

import { validateRequestInput } from '../validations/request';

const { expect } = chai;

chai.use(chaiHttp);

describe('Request Validation', () => {
  it('returns empty object because all validation is passed', (done) => {
    const result = validateRequestInput({
      name: 'Request 1',
      food_type: 'Beverage',
      pickup_date: '2019-09-12',
      pickup_time: '10pm',
    });
    expect(result.isValid).to.equal(true);
    expect(Object.keys(result.errors).length).to.equal(0);
    done();
  });

  it('returns object of validation required', (done) => {
    const result = validateRequestInput({});
    expect(result.isValid).to.equal(false);
    expect(Object.keys(result.errors).length).to.be.greaterThan(0);
    expect(result.errors.name).to.equal('Name field is required');
    expect(result.errors.food_type).to.equal('Food Type field is required');
    expect(result.errors.pickup_date).to.equal('Pickup Date field is required');
    expect(result.errors.pickup_time).to.equal('Pickup Time field is required');
    expect(result.errors).to.be.an('object');
    done();
  });
});

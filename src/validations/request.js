import Validator from 'validator';
import isEmpty from './isEmpty';

const validateRequestInput = (input) => {
  const errors = {};
  const data = input;

  data.name = !isEmpty(data.name) ? data.name : '';
  data.food_type = !isEmpty(data.food_type) ? data.food_type : '';
  data.pickup_date = !isEmpty(data.pickup_date) ? data.pickup_date : '';
  data.pickup_time = !isEmpty(data.pickup_time) ? data.pickup_time : '';
  data.comment = !isEmpty(data.comment) ? data.comment : '';
  data.instruction = !isEmpty(data.instruction) ? data.instruction : '';

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = 'Name must be between 2 and 30 characters';
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Name field is required';
  }

  if (Validator.isEmpty(data.food_type)) {
    errors.food_type = 'Food Type field is required';
  }

  if (Validator.isEmpty(data.pickup_date)) {
    errors.pickup_date = 'Pickup Date field is required';
  }

  if (Validator.isEmpty(data.pickup_time)) {
    errors.pickup_time = 'Pickup Time field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export { validateRequestInput };

import Validator from 'validator';
import isEmpty from './isEmpty';

const validateSignupInput = (input) => {
  const errors = {};
  const data = input;

  data.username = !isEmpty(data.username) ? data.username : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.type = !isEmpty(data.type) ? data.type : '';
  data.name = !isEmpty(data.name) ? data.name : '';

  data.name = data.name.trim();
  data.password = String(data.password);

  const isNameValid = data.name.split(' ').every((word) => {
    if (!word) {
      return true;
    }
    if (Validator.isAlpha(word) === false) {
      return false;
    }
    return true;
  });

  if (isNameValid === false) {
    errors.name = 'Name cannot contain number(s)';
  }

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = 'Name must be between 2 and 30 characters';
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Name field is required';
  }

  if (Validator.isEmpty(data.username)) {
    errors.username = 'Username field is required';
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  }

  if (!errors.email) {
    if (!Validator.isEmail(data.email)) {
      errors.email = 'Email is invalid';
    }
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }

  if (!errors.password) {
    if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
      errors.password = 'Password must be at least 6 characters';
    }
  }

  if (typeof data.type === 'number') {
    data.type = String(data.type);
  }

  if (Validator.isInt(data.type)) {
    if (data.type > 2) {
      errors.type = 'Invalid Type. Type cannot be greater than 2';
    }
  }

  if (!Validator.isInt(data.type)) {
    errors.type = 'Type field must be a number';
  }

  if (!data.type) {
    errors.type = 'Type field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

const me = '1';

export { validateSignupInput, me };

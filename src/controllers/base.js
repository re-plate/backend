/* eslint-disable class-methods-use-this */
class BaseController {
  success(res, status, message = '', data = '') {
    const response = {
      data,
      status: 'success',
    };
    if (message) {
      response.message = message;
    }

    if (data) {
      response.data = data;
    }
    return res.status(status).json(response);
  }

  error(res, status, message = '', errors = '') {
    const response = {
      status: 'error',
    };

    if (message) {
      response.message = message;
    }

    if (errors) {
      response.errors = errors;
    }
    return res.status(status).json(response);
  }
}

export default BaseController;

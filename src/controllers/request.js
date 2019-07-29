import BaseController from './base';

import { insert } from '../models/request';

class Request extends BaseController {
  /**
   * Register Route
   * @param {object} req
   * @param {object} res
   * @returns {object} object
   * @route POST api/v1/requests/
   * @description This function implements the logic for creating a new request.
   * @access Public
   */
  async createRequest(req, res) {
    try {
    } catch (error) {}
  }
}

export default Request;

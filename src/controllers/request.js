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
      const {
        name,
        food_type,
        pickup_date,
        pickup_time,
        comment,
        instruction,
      } = req.body;

      const newRequest = await insert({
        name,
        food_type,
        pickup_date,
        pickup_time,
        comment,
        instruction,
        user_id: req.user_id,
      });

      if (newRequest.length > 0) {
        return super.success(
          res,
          201,
          'Request created successfully',
          newRequest[0],
        );
      }
    } catch (error) {
      return super.error(res, 500, 'Unable to create request');
    }
  }
}

export default Request;

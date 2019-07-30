import BaseController from './base';

import {
  insert, getByUserId, get, getById,
} from '../models/request';
import { convertStatus } from '../utils';

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

  /**
   * Register Route
   * @param {object} req
   * @param {object} res
   * @returns {object} object
   * @route GET api/v1/requests/
   * @description This function implements the logic for getting all requests for a business.
   * @access Public
   */
  async getRequests(req, res) {
    try {
      const { user_id } = req;

      let requests = await getByUserId(user_id);
      if (requests.length === 0) {
        return super.error(res, 404, 'No Request Found');
      }
      requests = convertStatus(requests);
      return super.success(res, 200, 'Requests gotten successfully', requests);
    } catch (error) {
      return super.error(res, 500, 'Unable to get requests');
    }
  }

  /**
   * Register Route
   * @param {object} req
   * @param {object} res
   * @returns {object} object
   * @route GET api/v1/requests/:id
   * @description This function implements the logic for getting request by id for a business.
   * @access Public
   */
  async getRequestById(req, res) {
    try {
      const { user_id } = req;
      const { id } = req.params;
      let request = '';
      if (req.type === 1) {
        request = await getByUserId(user_id, id);
      } else {
        request = await getById(id);
      }

      if (req.type === 1 && !request) {
        return super.error(res, 404, 'No Request Found or You do not have the right access');
      }

      if (!request) {
        return super.error(res, 404, 'No Request Found');
      }
      request = convertStatus(request);
      return super.success(res, 200, 'Request gotten successfully', request);
    } catch (error) {
      return super.error(res, 500, 'Unable to get requests');
    }
  }

  /**
   * Register Route
   * @param {object} req
   * @param {object} res
   * @returns {object} object
   * @route GET api/v1/requests/all
   * @description This function implements the logic for getting all requests for a business.
   * @access Public
   */
  async getAllRequests(req, res) {
    try {
      let requests = await get();

      if (requests.length === 0) {
        return super.error(res, 404, 'No Request Found');
      }
      requests = convertStatus(requests);
      return super.success(res, 200, 'Request gotten successfully', requests);
    } catch (error) {
      return super.error(res, 500, 'Unable to get requests');
    }
  }
}

export default Request;

import BaseController from './base';

import { findBusiness } from '../models/auth';
import { findRequest } from '../models/request';
import { convertStatus } from '../utils';

class Search extends BaseController {
  /**
   * Register Route
   * @param {object} req
   * @param {object} res
   * @returns {object} object
   * @route GET api/v1/search/business?name=query
   * @description This function implements the logic for searching a business.
   * @access Public
   */
  async searchBusiness(req, res) {
    try {
      const { name } = req.query;

      const businesses = await findBusiness(name);
      if (businesses.length === 0) {
        return super.error(res, 404, 'No business found with search parameter');
      }

      return super.success(
        res,
        200,
        'Business gotten successfully',
        businesses,
      );
    } catch (error) {
      return super.error(res, 500, 'Unable to get business');
    }
  }

  async searchRequest(req, res) {
    try {
      const { name } = req.query;

      let requests = await findRequest(name);

      if (requests.length === 0) {
        return super.error(res, 404, 'No request found with search parameter');
      }
      requests = convertStatus(requests);

      return super.success(res, 200, 'Request gotten successfully', requests);
    } catch (error) {
      return super.error(res, 500, 'Unable to get requests');
    }
  }
}

export default Search;

import BaseController from './base';

import {} from '../models/request';
import { convertStatus } from '../utils';

class Search extends BaseController {
  /**
   * Register Route
   * @param {object} req
   * @param {object} res
   * @returns {object} object
   * @route GET api/v1/requests/all
   * @description This function implements the logic for getting all requests for a business.
   * @access Public
   */
  async searchBusiness(req, res) {
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

export default Search;

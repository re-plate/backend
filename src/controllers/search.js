import BaseController from './base';

import { findBusiness } from '../models/auth';

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
        return super.success(
          res,
          404,
          'No business found with search parameter',
        );
      }

      return super.success(
        res,
        200,
        'Business gotten successfully',
        businesses,
      );
    } catch (error) {
      return super.error(res, 500, 'Unable to get requests');
    }
  }
}

export default Search;

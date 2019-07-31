import { getByUsername, getByEmail } from '../models/auth';
import BaseController from '../controllers/base';

class AuthMiddleware extends BaseController {
  /**
 * validateUserName
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns {object} object
 * @description This function validates the username to see if it does not exist in the database.
 */
  async validateUserName(req, res, next) {
    const { username } = req.body;
    const user = await getByUsername(username);
    if (user) {
      return super.error(res, 409, 'Username already taken');
    }
    next();
  }

  /**
 * validateEmail
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns {object} object
 * @description This function validates the email to see if it does not exist in the database.
 */
  async validateEmail(req, res, next) {
    const { email } = req.body;

    const user = await getByEmail(email);
    if (user) {
      return super.error(res, 409, 'Email already taken');
    }
    next();
  }
}

export default AuthMiddleware;

import BaseController from './base';
import { validateSignupInput } from '../validations/auth';
import { hashPassword } from '../utils';
import { insert } from '../models/auth';

class Auth extends BaseController {
  /**
   * Signup Route
   * @param {object} req
   * @param {object} res
   * @returns {object} object
   * @route POST api/v1/auth/register
   * @description This function implements the logic for registering a new user.
   * @access Public
   */
  async register(req, res) {
    try {
      const { errors, isValid } = validateSignupInput(req.body);

      // Check validation
      if (!isValid) {
        return super.error(res, 400, '', errors);
      }

      const {
 username, email, password, type, name,
} = req.body;

      const hashedPassword = hashPassword(password);
      const userData = {
        username,
        email,
        type,
        name,
        password: hashedPassword,
      };

      const newUser = await insert(userData);

      if (newUser.length > 0) {
        const userResponse = {
          username: newUser[0].username,
          email: newUser[0].email,
          type: newUser[0].type,
          phone: newUser[0].phone,
          name: newUser[0].name,
          id: newUser[0].id,
        };

        return super.success(
          res,
          201,
          'User registered successfully',
          userResponse,
        );
      }
    } catch (error) {
      return super.error(res, 500, 'Unable to register user');
    }
  }
}

export default Auth;

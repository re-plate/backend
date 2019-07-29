import BaseController from './base';

import { hashPassword, verifyPassword } from '../utils';
import { insert, getByUsername } from '../models/auth';

class Auth extends BaseController {
  /**
   * Register Route
   * @param {object} req
   * @param {object} res
   * @returns {object} object
   * @route POST api/v1/auth/register
   * @description This function implements the logic for registering a new user.
   * @access Public
   */
  async register(req, res) {
    try {
      const {
 username, email, password, type, name 
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

  /**
   * Login Route
   * @param {object} req
   * @param {object} res
   * @returns {object} object
   * @route POST api/v1/auth/login
   * @description This function implements the logic for logging in a new user.
   * @access Public
   */
  async login(req, res) {
    try {
      const { username, password } = req.body;

      const existingUser = await getByUsername(username);
      console.log(existingUser);
      const isValidPassword = verifyPassword(password, existingUser.password);
      console.log(isValidPassword);

      if (isValidPassword === true) {
        // const data = {

        // }
        return super.success(res, 200, 'Login successfull');
      }
      return super.error(res, 401, 'Invalid Password');

      // return super.success(
      //   res,
      //   201,
      //   'User registered successfully',

      // );
    } catch (error) {
      return super.error(res, 500, 'Unable to login user');
    }
  }
}

export default Auth;

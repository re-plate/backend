import dotenv from 'dotenv';

import BaseController from './base';
import { hashPassword, verifyPassword, generateToken } from '../utils';
import { insert, getByUsername } from '../models/auth';
import sendMessage from '../services/Sms';

dotenv.config();

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
        username, email, password, type, name, phone,
      } = req.body;

      const hashedPassword = hashPassword(password);
      const userData = {
        username,
        email,
        type,
        name,
        phone,
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
        console.log(process.env.NODE_ENV)
        if (process.env.NODE_ENV === 'production') { console.log('i entered o')
          if (phone) {
            const message = `Hello ${name}, thank you for registering on replate platform, it's great to have you.`;
            sendMessage(phone, message);
          }
        }

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

      if (existingUser) {
        const isValidPassword = verifyPassword(password, existingUser.password);

        if (isValidPassword === true) {
          const payload = {
            id: existingUser.id,
            type: existingUser.type,
          };
          const token = generateToken(payload);

          const data = {
            token,
          };
          return super.success(res, 200, 'Login successful', data);
        }
        return super.error(res, 401, 'Invalid Password');
      }
      return super.error(res, 404, 'User not found');
    } catch (error) {
      return super.error(res, 500, 'Unable to login user');
    }
  }
}

export default Auth;

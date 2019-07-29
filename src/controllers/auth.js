import { validateSignupInput } from '../validations/auth';
import { hashPassword } from '../utils';
import { insert } from '../models/auth';

class Auth {
  /**
   * Signup Route
   * @param {object} req
   * @param {object} res
   * @returns {object} object
   * @route POST api/v1/auth/register
   * @description This function implements the logic for registering a new user.
   * @access Public
   */
  static async register(req, res) {
    try {
      const { errors, isValid } = validateSignupInput(req.body);

      // Check validation
      if (!isValid) {
        return res.status(400).json({ status: 'error', errors });
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
        };

        return res.status(201).json({
          status: 'success',
          message: 'User registered successfully',
          data: userResponse,
        });
      }
    } catch (error) {
      return res
        .status(500)
        .json({ status: 'error', message: 'Unable to register user' });
    }
  }
}

export default Auth;

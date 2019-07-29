import { validateSignupInput } from '../validations/auth';
import { hashPassword, verifyPassword } from '../utils';

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
  static register(req, res) {
    const { errors, isValid } = validateSignupInput(req.body);
    let { password } = req.body;
    // Check validation
    if (!isValid) {
      return res.status(400).json({ status: 'error', errors });
    }

    password = hashPassword(password);

    // console.log(pass);
  }
}

export default Auth;

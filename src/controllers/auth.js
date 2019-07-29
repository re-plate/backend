import { validateSignupInput } from "../validations/auth";

// const { validateSignupInput } = authValidations;

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

    // Check validation
    if (!isValid) {
      return res.status(400).json({ status: "error", errors });
    }
  }
}

export default Auth;

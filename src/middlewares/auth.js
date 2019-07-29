import { getByUsername, getByEmail } from '../models/auth';
import BaseController from '../controllers/base';

class AuthMiddleware extends BaseController {
  async validateUserName(req, res, next) {
    const { username } = req.body;
    const user = await getByUsername(username);
    if (user) {
      return super.error(res, 409, 'Username already taken');
    }
    next();
  }

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

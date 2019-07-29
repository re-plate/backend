import express from 'express';

import AuthController from '../controllers/auth';
import AuthMiddleware from '../middlewares/auth';
import { validateSignupInput } from '../validations/auth';
import validateInput from '../middlewares';

const authController = new AuthController();
const authMiddeware = new AuthMiddleware();

const { register } = authController;
const { validateUserName, validateEmail } = authMiddeware;
const Router = express.Router();
// @route   POST api/v1/auth/register
// @desc    Register user
// @access  Public
Router.post(
  '/register',
  validateInput(validateSignupInput),
  validateUserName,
  validateEmail,
  register,
);

export default Router;

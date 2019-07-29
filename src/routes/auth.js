import express from 'express';

import AuthController from '../controllers/auth';
import AuthMiddleware from '../middlewares/auth';

// import { validateUserName } from '../middlewares/auth';

const authController = new AuthController();
const authMiddeware = new AuthMiddleware();

const { register } = authController;
const { validateUserName } = authMiddeware;
const Router = express.Router();

// @route   POST api/v1/auth/register
// @desc    Register user
// @access  Public
Router.post('/register', validateUserName, register);

export default Router;

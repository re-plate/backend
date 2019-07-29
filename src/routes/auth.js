import express from 'express';

import AuthController from '../controllers/auth';
const authController = new AuthController();

const { register } = AuthController;
const Router = express.Router();

// @route   POST api/v1/auth/register
// @desc    Register user
// @access  Public
Router.post('/register', authController.register);

export default Router;

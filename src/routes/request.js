import express from 'express';

import RequestController from '../controllers/request';

import { validateSignupInput } from '../validations/auth';
import { validateInput, validateToken } from '../middlewares';

const { createRequest } = RequestController;

const Router = express.Router();

// @route   POST api/v1/auth/requests
// @desc    Create new request
// @access  Private
Router.post('/', validateToken);

export default Router;

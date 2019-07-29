import express from 'express';

import RequestController from '../controllers/request';

import { validateRequestInput } from '../validations/request';
import { validateInput, validateToken } from '../middlewares';

const requestController = new RequestController();

const { createRequest } = requestController;

const Router = express.Router();

// @route   POST api/v1/auth/requests
// @desc    Create new request
// @access  Private
Router.post(
  '/',
  validateToken,
  validateInput(validateRequestInput),
  createRequest,
);

export default Router;

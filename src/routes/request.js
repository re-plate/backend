import express from 'express';

import RequestController from '../controllers/request';

import { validateRequestInput } from '../validations/request';
import { validateInput, validateToken, isBusiness } from '../middlewares';

const requestController = new RequestController();

const { createRequest, getRequests } = requestController;

const Router = express.Router();

// @route   POST api/v1/auth/requests
// @desc    Create new request
// @access  Private
Router.post(
  '/',
  validateToken,
  isBusiness,
  validateInput(validateRequestInput),
  createRequest,
);

// @route   GET api/v1/auth/requests
// @desc    Get all requests
// @access  Private
Router.get('/', validateToken, isBusiness, getRequests);

export default Router;
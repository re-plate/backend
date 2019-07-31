import express from 'express';

import RequestController from '../controllers/request';

import { validateRequestInput } from '../validations/request';
import {
  validateInput,
  validateToken,
  isBusiness,
  isVolunteer,
} from '../middlewares';

const requestController = new RequestController();

const {
  createRequest,
  getRequests,
  getRequestById,
  getAllRequests,
  deleteRequest,
  updateRequest,
} = requestController;

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

// @route   GET api/v1/auth/requests/all
// @desc    Get all requests.
// @access  Private
Router.get('/all', validateToken, isVolunteer, getAllRequests);

// @route   GET api/v1/auth/requests
// @desc    Get all requests
// @access  Private
Router.get('/', validateToken, isBusiness, getRequests);

// @route   GET api/v1/auth/requests/:id
// @desc    Get request by id
// @access  Private
Router.get('/:id', validateToken, getRequestById);

// @route   GET api/v1/auth/requests/:id
// @desc    Get request by id
// @access  Private
Router.get('/:id', validateToken, isBusiness, getRequestById);

// @route   PUT api/v1/auth/requests/:id
// @desc    Updates a request by id
// @access  Private
Router.put(
  '/:id',
  validateToken,
  isBusiness,
  validateInput(validateRequestInput),
  updateRequest,
);

// @route   DELETE api/v1/auth/requests/:id
// @desc    Deletes a request by id
// @access  Private
Router.delete('/:id', validateToken, isBusiness, deleteRequest);

// @route   POST api/v1/auth/requests/action
// @desc    Deletes a request by id
// @access  Private
Router.delete('/:id', validateToken, isBusiness, deleteRequest);

export default Router;

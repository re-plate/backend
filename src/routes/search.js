import express from 'express';

import SearchController from '../controllers/search';

import { validateToken, isVolunteer } from '../middlewares';

const searchController = new SearchController();

const { searchBusiness, searchRequest } = searchController;

const Router = express.Router();

// @route   GET api/v1/auth/search/business?name=query
// @desc    Search Business.
// @access  Private
Router.get('/business', validateToken, isVolunteer, searchBusiness);

// @route   GET api/v1/auth/search/requests?name=query
// @desc    Search Requests.
// @access  Private
Router.get('/requests', validateToken, isVolunteer, searchRequest);

export default Router;

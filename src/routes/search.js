import express from 'express';

import SearchController from '../controllers/search';

import { validateToken, isBusiness, isVolunteer } from '../middlewares';

const searchController = new SearchController();

const { searchBusiness } = searchController;

const Router = express.Router();

// @route   GET api/v1/auth/search/business?name=query
// @desc    Search Business.
// @access  Private
Router.get('/business', validateToken, isVolunteer, searchBusiness);

export default Router;

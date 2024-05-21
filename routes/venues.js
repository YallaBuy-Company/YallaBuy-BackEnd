import express from 'express';
import venuesController from '../controllers/venues.js';

const router = express.Router();

// Get venues by city
router.get('/cities', venuesController.fetchVenues);
// Get venues by country
router.get('/countries', venuesController.fetchVenues);

export default router;


import express from 'express';
import leagueController from '../controllers/leagues.js';

const router = express.Router();

// Create a new league
router.post('/leagues', leagueController.createLeague);

// Get all leagues
router.get('/leagues', leagueController.getAllLeagues);

// Get a league by ID
router.get('/leagues/:id', leagueController.getLeagueById);

// Update a league by ID
router.patch('/leagues/:id', leagueController.updateLeague);

// Delete a league by ID
router.delete('/leagues/:id', leagueController.deleteLeague);

export default router;

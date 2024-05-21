import express from 'express';
import leaguesController from '../controllers/leagues.js';

const router = express.Router();

// Get all leagues
router.get('/', leaguesController.getLeagues);
// Get all league names
router.get('/names', leaguesController.getLeagueNames);

export default router;
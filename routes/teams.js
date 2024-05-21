import express from 'express';
import teamsController from '../controllers/teams.js';

const router = express.Router();

// Get all teams
router.get('/', teamsController.getTeams);
// Get all team names
router.get('/names', teamsController.getTeamNames);



export default router;

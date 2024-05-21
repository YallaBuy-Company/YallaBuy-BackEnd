import teamsService from '../services/teams.js';

const getTeams = async (req, res) => {
    try {
      const teams = await teamsService.getAllTeams();
      res.json(teams);
    } catch (error) {
      res.status(500).json({ message: error.message }); 
    }
  };

  const getTeamNames = async (req, res) => {
    try {
      const teamNames = await teamsService.getAllTeamNames();
      res.json(teamNames);
    } catch (error) {
      res.status(500).json({ message: error.message }); 
    }
  };



  export default { getTeams, getTeamNames }; 
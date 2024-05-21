import leaguesService from '../services/leagues.js';

const getLeagues = async (req, res) => {
    try {
      const leagues = await leaguesService.getAllLeagues();
      res.json(leagues);
    } catch (error) {
      res.status(500).json({ message: error.message }); 
    }
  };

  const getLeagueNames = async (req, res) => {
    try {
      const leagueNames = await leaguesService.getAllLeagueNames();
      res.json(leagueNames);
    } catch (error) {
      res.status(500).json({ message: error.message }); 
    }
  };
  export default { getLeagues, getLeagueNames }; 

import League from '../models/leagues.js';

const getAllLeagues = async () => {
    try {
      const leagues = await League.find();
      return leagues;
    } catch (error) {
      throw error; // Re-throw for controller to handle
    }
  };

  const getAllLeagueNames = async () => {
    try {
      // Use projection to include only `_id` and `name`
      const leagues = await League.find({}, '_id name');
      return leagues;
    } catch (error) {
      throw error; // Re-throw for controller to handle
    }
  };

  export default{ getAllLeagues , getAllLeagueNames};
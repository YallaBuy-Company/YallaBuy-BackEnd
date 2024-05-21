import Team from '../models/teams.js';

const getAllTeams = async () => {
    try {
      const teams = await Team.find();
      return teams;
    } catch (error) {
      throw error; // Re-throw for controller to handle
    }
  };

  const getAllTeamNames = async () => {
    try {
      // Use projection to include only `_id` and `name`
      const teams = await Team.find({}, '_id name');
      return teams;
    } catch (error) {
      throw error; // Re-throw for controller to handle
    }
  };
  
  export default{ getAllTeams, getAllTeamNames };
import League from '../models/leagues.js';

const createLeague = async (leagueData) => {
  const league = new League(leagueData);
  return await league.save();
};

const getAllLeagues = async () => {
  return await League.find({});
};

const getLeagueById = async (id) => {
  return await League.findById(id);
};

const updateLeague = async (id, updateData) => {
  const updates = Object.keys(updateData);
  const allowedUpdates = ['apiId', 'name', 'type', 'logo', 'country'];
  const isValidOperation = updates.every(update => allowedUpdates.includes(update));

  if (!isValidOperation) {
    throw new Error('Invalid updates!');
  }

  const league = await League.findById(id);
  if (!league) {
    throw new Error('League not found');
  }

  updates.forEach(update => league[update] = updateData[update]);
  return await league.save();
};

const deleteLeague = async (id) => {
  const league = await League.findByIdAndDelete(id);
  if (!league) {
    throw new Error('League not found');
  }
  return league;
};

export default {
  createLeague,
  getAllLeagues,
  getLeagueById,
  updateLeague,
  deleteLeague
};

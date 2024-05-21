import leagueService from '../services/leagues.js';

const createLeague = async (req, res) => {
  try {
    const league = await leagueService.createLeague(req.body);
    res.status(201).send(league);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const getAllLeagues = async (req, res) => {
  try {
    const leagues = await leagueService.getAllLeagues();
    res.send(leagues);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const getLeagueById = async (req, res) => {
  try {
    const league = await leagueService.getLeagueById(req.params.id);
    if (!league) {
      return res.status(404).send();
    }
    res.send(league);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const updateLeague = async (req, res) => {
  try {
    const league = await leagueService.updateLeague(req.params.id, req.body);
    res.send(league);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const deleteLeague = async (req, res) => {
  try {
    const league = await leagueService.deleteLeague(req.params.id);
    res.send(league);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

export default {
  createLeague,
  getAllLeagues,
  getLeagueById,
  updateLeague,
  deleteLeague
};

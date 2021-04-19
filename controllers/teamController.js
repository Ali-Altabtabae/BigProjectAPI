const { Team } = require("../db/models");

exports.teamCreate = async (req, res) => {
  try {
  
    const teamCreate = await team.create(req.body);
    attributes: {
      exclude: ["createdAt", "updatedAt"];
    }
    res.json(teamCreate);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.teamList = async (req, res) => {
  try {
    const teams = await Team.findAll();
    res.json(teams);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.teamUpdate = (req, res) => {
  const { teamId } = req.params;
  const foundteam = Team.find((team) => team.id === +teamId);
  if (foundteam) {
    for (const key in req.body) foundteam[key] = req.body[key];g
    res.status(204).end();
  } else {
    res.status(404).json({ message: "team not found" });
  }
};

exports.teamDelete = (req, res) => {
  const { teamId } = req.params;
  const foundteam = Team.find((team) => team.id === +teamId);
  if (foundteam) {
    Team = Team.filter((team) => team.id !== +teamId);
    res.status(204).end();
  } else {
    res.status(404).json({ message: "team not found" });
  }
};
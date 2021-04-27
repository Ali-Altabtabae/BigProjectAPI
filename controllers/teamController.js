const { Team, User } = require("../db/models");

exports.teamCreate = async (req, res) => {
  try {
    const teamCreate = await Team.create(req.body);
    res.json(teamCreate);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.teamList = async (req, res) => {
  try {
    const teams = await Team.findAll({
      exclude: ["createdAt", "updatedAt"],
      include: {
        model: User,
        attributes: { exclude: ["password", "createdAt", "updatedAt"] },
      },
    });
    res.json(teams);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.teamUpdate = async (req, res) => {
  const { teamId } = req.params;
  try {
    const foundTeam = await Team.findByPk(teamId);
    if (foundTeam) {
      await foundTeam.update(req.body);
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Team not Found " });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.teamDelete = async (req, res) => {
  const { teamId } = req.params;
  try {
    const foundTeam = await Team.findByPk(teamId);
    if (foundTeam) {
      await foundTeam.destroy(req.body);
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Team not Found " });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

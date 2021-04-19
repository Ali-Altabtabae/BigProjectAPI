module.exports = (sequelize, DataTypes) => {
    const Team = sequelize.define("Team", {
      teamName: {
        type: DataTypes.STRING,
      },
  
      players: {
        type: DataTypes.STRING,
      },
  
    });
  
    return Team;
  };
  
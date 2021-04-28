module.exports = (sequelize, DataTypes) => {
  const Bookings = sequelize.define("Bookings", {
    date: {
      type: DataTypes.DATE,
    },
    time: {
      type: DataTypes.STRING,
    },
  });
  return Bookings;
};

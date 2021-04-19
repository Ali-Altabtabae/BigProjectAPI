const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
  const Field = sequelize.define("Field", {
    fieldname: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "filedname already exists",
      },
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "Location not exsist ",
      },
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  return Field;
};

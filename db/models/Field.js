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
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: DataTypes.STRING,

    timeSlots: {
      type: DataTypes.ARRAY(DataTypes.DATE),
    },
  });
  return Field;
};

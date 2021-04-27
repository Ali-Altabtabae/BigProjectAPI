const bcrypt = require("bcrypt");
const { User } = require("../db/models");
const { JWT_SECRET, JWT_EXPIRATION_MS } = require("../config/keys");
const jwt = require("jsonwebtoken");

// List Users
exports.userList = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create User
exports.signup = async (req, res, next) => {
  const { password } = req.body;
  const saltRounds = 5;
  if (req.body.username.includes(" ")) {
    return res.status(404).json("user cannot contain space");
  }
  
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log("exports.signup -> hashedPassword", hashedPassword);
    req.body.password = hashedPassword;
    const newUser = await User.create(req.body);
    const payload = {
      id: newUser.id,
      username: newUser.username,
      exp: Date.now() + JWT_EXPIRATION_MS,
    };

    const token = jwt.sign(JSON.stringify(payload), JWT_SECRET);
    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};

// User Sign in
exports.signin = (req, res) => {
  const { user } = req;
  const payload = {
    id: user.id,
    username: user.username,
    exp: Date.now() + parseInt(JWT_EXPIRATION_MS),
  };
  const token = jwt.sign(JSON.stringify(payload), JWT_SECRET);
  res.json({ token });
};

// Update User
exports.userUpdate = async (req, res) => {
  const { userId } = req.params;
  try {
    const foundUser = await User.findByPk(userId);
    if (foundUser) {
      await foundUser.update(req.body);
      res.status(204).end();
    } else {
      res.status(404).json({ message: "User not Found " });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

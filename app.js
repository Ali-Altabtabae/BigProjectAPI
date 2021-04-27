// Express
const express = require("express");
const app = express();

// Cors
const cors = require("cors");
app.use(cors());

// Body-Parser
app.use(express.json());

// Passport
const passport = require("passport");
app.use(passport.initialize());

// Passport Strategy
const { localStrategy, jwtStrategy } = require("./middleware/passport");
app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);

// db
const db = require("./db/models");

// Routers
const userRoute = require("./routes/userRoute");
app.use(userRoute);

const teamRoute = require("./routes/teamRoute");
app.use("/teams", teamRoute);

const fieldRoute = require("./routes/fieldRoute");
app.use("/fields", fieldRoute);

// Handle Images
const path = require("path");
app.use("/media", express.static(path.join(__dirname, "media")));

// Error Handling Middleware
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message || "Internal Server Error",
  });
});

// Paths Handling Middleware
app.use((req, res, next) => {
  res.status(404).json({ message: "Path not found" });
});

// Run API
const run = async () => {
  try {
    //await db.sequelize.sync({ alter: true });
    await db.sequelize.sync();
    console.log("Connection to the database successful!");
    await app.listen(8000, () => {
      console.log("The application is running on localhost:8000");
    });
  } catch (error) {
    console.error("Error connecting to the database: ", error);
  }
};

run();

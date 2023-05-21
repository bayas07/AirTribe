const moviesRoutes = require("express").Router();
const bodyParser = require("body-parser");
const { sequalize } = require("../config/mysql");
const { DataTypes } = require("sequelize");
const { getMoviesByDateQuery, getAllMoviesQuery } = require("../utills/helpers");

moviesRoutes.use(bodyParser.urlencoded({ extended: false }));
moviesRoutes.use(bodyParser.json());

const theaterList = sequalize.define("Theaters", {
  TheaterId: DataTypes.INTEGER,
  TheaterName: DataTypes.STRING,
  City: DataTypes.STRING,
});

// To get all the theater's list
moviesRoutes.get("/:city", async (req, res) => {
  const city = req.params.city;
  const users = await theaterList.findAll({
    attributes: {
      exclude: ["id", "createdAt", "updatedAt"],
    },
    where: { City: city },
  });

  if (users && users.length > 0) {
    res.status(200).json(users);
  } else {
    res.status(400).send({ message: "No results found" });
  }
});

// To get all the movies in the selected theatre
moviesRoutes.get("/:city/:theatreId", async (req, res) => {
  const city = req.params.city;
  const theatreId = req.params.theatreId;

  const query = getAllMoviesQuery(theatreId, city);
  const [results] = await sequalize.query(query);

  if (results && results.length > 0) {
    res.status(200).json(results);
  } else {
    res.status(400).send({ message: "No results found" });
  }
});

// To get all the movies for the specific date
moviesRoutes.get("/:city/:theatreId/:date", async (req, res) => {
  const city = req.params.city;
  const theatreId = req.params.theatreId;
  const date = req.params.date; // 20220506 - YYYY-MM-DD
  
  const query = getMoviesByDateQuery(theatreId, city, date);
  const [results] = await sequalize.query(query);

  if (results && results.length > 0) {
    res.status(200).json(results);
  } else {
    res.status(400).send({ message: "No results found" });
  }
});

module.exports = moviesRoutes;

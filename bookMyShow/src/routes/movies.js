const moviesRoutes = require("express").Router();
const bodyParser = require("body-parser");
const { sequalize } = require("../config/mysql");
const { DataTypes } = require("sequelize");

moviesRoutes.use(bodyParser.urlencoded({ extended: false }));
moviesRoutes.use(bodyParser.json());

const theaterList = sequalize.define("Theaters", {
  TheaterId: DataTypes.INTEGER,
  Name: DataTypes.STRING,
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

  const [results] = await sequalize.query(`
  SELECT TI.Id, TI.Screen, TI.AVType, TI.SubtitlesLanguage, TI.BookingStatus, TI.ShowTiming, TI.ShowDate, M.MovieName, M.MovieLanguage, M.MovieDimension, M.MovieCertification, TH.City, TH.TheaterName
  FROM myData.TheatersInfo TI
  INNER JOIN myData.Movies M
  ON TI.MovieId = M.MovieId
  INNER JOIN myData.Theaters TH
  ON TI.TheaterId = TH.TheaterId
  WHERE TI.TheaterId = ${theatreId} AND TH.City = '${city}'
`);

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

  const [results] = await sequalize.query(`
  SELECT TI.Id, TI.Screen, TI.AVType, TI.SubtitlesLanguage, TI.BookingStatus, TI.ShowTiming, TI.ShowDate, M.MovieName, M.MovieLanguage, M.MovieDimension, M.MovieCertification, TH.City, TH.TheaterName
  FROM myData.TheatersInfo TI
  INNER JOIN myData.Movies M
  ON TI.MovieId = M.MovieId
  INNER JOIN myData.Theaters TH
  ON TI.TheaterId = TH.TheaterId
  WHERE TI.TheaterId = ${theatreId} AND TH.City = '${city}' AND TI.ShowDate = '${date}'
`);

  if (results && results.length > 0) {
    res.status(200).json(results);
  } else {
    res.status(400).send({ message: "No results found" });
  }
});

module.exports = moviesRoutes;

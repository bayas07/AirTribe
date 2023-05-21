const express = require("express");
const bodyParser = require("body-parser");
const routes = require("express").Router();
const cors = require("cors");
const moviesRoutes = require("./routes/movies");
const { connectToDB } = require("./config/mysql");
require("dotenv").config();

const PORT = 3003;

const app = express();

app.use(routes);
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

routes.get("/", (req, res) => res.status(200).send("welcome to the task manager"));
routes.use("/movies", moviesRoutes);

app.listen(PORT, (err) => {
  if (!err) {
    console.log("Server is running on port " + PORT);
    connectToDB();
  }  
  else console.log("Unable to start the server", err);
});
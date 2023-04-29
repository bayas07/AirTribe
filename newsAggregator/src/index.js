const express = require("express");
const routes = require("express").Router();
const bodyParser = require("body-parser");
const cors = require("cors");
const { signIn, signUp } = require("../controllers/authController");
const newsRoutes = require("../routes/news");
const preferenceRoutes = require("../routes/preferences");
const verifyToken = require("../middleware/authJWT");
require("dotenv").config();

const PORT = 3003;

const app = express();

app.use(routes);
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

routes.use(bodyParser.urlencoded({ extended: false }));
routes.use(bodyParser.json());

routes.get("/", (req, res) => res.status(200).send("Welcome to airtribe news"));
routes.post("/register", signUp);
routes.post("/login", signIn);
routes.use("/news", verifyToken, newsRoutes);
routes.use("/preferences", verifyToken, preferenceRoutes);

app.listen(process.config.PORT || PORT, (err) => {
  if (err) console.log("There was an issue running the server");
  else console.log("Server is running on port " + PORT);
});

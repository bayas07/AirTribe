const express = require("express");
const bodyParser = require("body-parser");
const routes = require("express").Router();
const cors = require("cors");
const taskRoutes = require("../routes/tasks");

const PORT = 3003;

const app = express();

app.use(routes);
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

routes.get("/", (req, res) => res.status(200).send("welcome to the task manager"));
routes.use("/tasks", taskRoutes);

app.listen(PORT, (err) => {
  if (!err) console.log("Server is running on port " + PORT);
  else console.log("Unable to start the server", err);
});

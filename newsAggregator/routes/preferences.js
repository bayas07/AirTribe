const path = require("path");
const fs = require("fs");
const PreferenceRoutes = require("express").Router();

const userDataPath = path.join(__dirname, "../src", "users.json");
const userData = fs.readFileSync(userDataPath, {
  encoding: "utf8",
  flag: "r",
});
const parsedUserData = JSON.parse(userData);

PreferenceRoutes.get("/", (req, res) => {
  const { email, message } = req.body;
  if (email) {
    const userPreferences = parsedUserData.find(
      (user) => user.email === email
    ).preferences;
    res.status(200).send(userPreferences);
  }
  res.status(500).send({message: message});
});

PreferenceRoutes.put("/", (req, res) => {
  const { email, message, preferences } = req.body;
  if (email) {
    !preferences && res.status(400).send({message: 'Some properties are missing'});
    const updatedUsers = parsedUserData.map((user) => {
      if (user.email === email) {
        user.preferences = preferences.split(",");
      }
      return user
    });
    console.log(updatedUsers, '** preferences');
    fs.writeFileSync(userDataPath, JSON.stringify(updatedUsers), {
      encoding: "utf8",
      flag: "w",
    });
    res.status(200).send({message: 'Preferences have been updated'});
  }
  res.status(500).send({message: message});
});

module.exports = PreferenceRoutes;

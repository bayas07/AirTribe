const path = require("path");
const fs = require("fs");
const newsRoutes = require("express").Router();
const axios = require("axios");

const userDataPath = path.join(__dirname, "../src", "users.json");
const userData = fs.readFileSync(userDataPath, {
  encoding: "utf8",
  flag: "r",
});
const parsedUserData = JSON.parse(userData);

newsRoutes.get("/", (req, res) => {
  const { email, message } = req.body;

  if (!email) {
    return res.status(400).send({ message: message });
  }

  const currentUser = parsedUserData.find((user) => user.email === email);
  const userPreferences = currentUser?.preferences;

  if (userPreferences.length === 0) {
    res.status(200).send({ message: "There are no preferences exist" });
  } else {
    const getURL = (userPref) =>
      `https://gnews.io/api/v4/top-headlines?category=${userPref}&apikey=${process.env.API_KEY}`;
    const apiRequests = userPreferences.map((userPref) =>
      axios.get(getURL(userPref))
    );

    Promise.all(apiRequests)
      .then((responses) => {
        const newsArticles = responses.map((res) => res.data.articles);
        res.send(newsArticles);
      })
      .catch((error) => {
        res.status(500).send("Internal server error" + error);
      });
  }
});

module.exports = newsRoutes;

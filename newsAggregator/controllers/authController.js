const bcrypt = require("bcrypt");
const path = require("path");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const Validator = require("../helpers/validator");

const signUp = (req, res) => {
  const { name, email, password, preferences } = req.body;
  const userDataPath = path.join(__dirname, "../src", "users.json");
  const userData = fs.readFileSync(userDataPath, {
    encoding: "utf8",
    flag: "r",
  });
  const parsedUserData = JSON.parse(userData);

  const validateUser = Validator.validateUserSignUp(parsedUserData, {
    name,
    email,
    password,
  });

  if (!validateUser.status) {
    res.status(400).send({ message: validateUser.message });
  } else {
    const newUser = {
      name,
      email,
      password: bcrypt.hashSync(password, 10),
      preferences: preferences?.split(",") || [],
    };
    const updatedUsers = JSON.stringify([...parsedUserData, newUser]);

    fs.writeFileSync(userDataPath, updatedUsers, {
      encoding: "utf8",
      flag: "w",
    });

    res.status(200).send({ message: "User has been registered successfully" });
  }
};

const signIn = (req, res) => {
  const { email, password } = req.body;
  const userDataPath = path.join(__dirname, "../src", "users.json");
  const userData = fs.readFileSync(userDataPath, {
    encoding: "utf8",
    flag: "r",
  });
  const parsedUserData = JSON.parse(userData);

  const validateUser = Validator.validateUserSignIn(parsedUserData, {
    email,
    password,
  });

  !validateUser.status &&
    res.status(400).send({ message: validateUser.message });

  if (validateUser.status) {
    const currentUser = parsedUserData.find((user) => user.email === email);
    const isPasswordMatching = bcrypt.compareSync(
      password,
      currentUser.password
    );
    !isPasswordMatching &&
      res.status(400).send({ message: "Password is incorrect" });
    if (isPasswordMatching) {
      const jwtToken = jwt.sign({ email, password }, process.env.SECRET, {
        expiresIn: 86400,
      });
      res
        .status(200)
        .send({ message: "User Login successfully", token: jwtToken });
    }
  }
};

module.exports = { signUp, signIn };

const Sequalize = require("sequelize");
console.log(process.env.PASSWORD)
// setup a connection
const sequalize = new Sequalize(process.env.DB_NAME, process.env.USER_NAME, process.env.PASSWORD, {
  dialect: "mysql",
  host: "localhost",
});

// Connection check
const connectToDB = async () => {
  try {
    await sequalize.authenticate();
    console.log("Connected to database successfully!");
  } catch (err) {
    console.log("There was an error to connect DB", err);
  }
};

module.exports = {sequalize, connectToDB}
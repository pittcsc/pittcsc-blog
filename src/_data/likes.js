var pg = require("pg");
require("dotenv").config();

const connectionString = process.env.SUPABASE_CONNECTION;

const getLikes = async () => {
  var pgClient = new pg.Client(connectionString);

  pgClient.connect();

  return pgClient.query("SELECT * from posts");
};

module.exports = async function () {
  return await getLikes();
};

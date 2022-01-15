require("dotenv").config();
var pg = require("pg");

const connectionString = process.env.SUPABASE_CONNECTION;
var pgClient = new pg.Client(connectionString);
pgClient.connect();

module.exports = { pgClient };

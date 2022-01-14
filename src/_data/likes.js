var pg = require("pg");

const connectionString =
  "postgres://postgres:pittcscblogsrock@db.httmchjxjclwidvyocby.supabase.co:6543/postgres";

const getLikes = async () => {
  var pgClient = new pg.Client(connectionString);

  pgClient.connect();

  return pgClient.query("SELECT * from posts");
};

module.exports = async function () {
  return await getLikes();
};

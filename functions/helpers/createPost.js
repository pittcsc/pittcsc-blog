const { pgClient } = require("./supabase");
const formattedReturn = require("./formattedReturn");

module.exports = async (event) => {
  const body = JSON.parse(event.body);

  const pgQuery = "INSERT INTO posts(likes, title, author) VALUES($1, $2, $3)";
  const values = [0, body.title, body.author];
  try {
    pgClient.query(pgQuery, values, (err, res) => {
      if (err) {
        console.log(err.stack);
        console.log("Fail?");
        return formattedReturn(500, err.stack);
      } else {
        console.log(res);
        return formattedReturn(200, res);
      }
    });
    return formattedReturn(200, "Successfully Added New Row!");
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};

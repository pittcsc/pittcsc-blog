const { pgClient } = require("./supabase");
const formattedReturn = require("./formattedReturn");

module.exports = async (event) => {
  const body = JSON.parse(event.body);
  const pgQuery = "UPDATE posts SET likes = likes - 1 WHERE title = $1";
  const values = [body.title];
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
    return formattedReturn(200, "Successfully Decremented Like!");
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};

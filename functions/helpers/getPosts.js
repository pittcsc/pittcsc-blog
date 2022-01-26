const { pgClient } = require("./supabase");
const formattedReturn = require("./formattedReturn");

module.exports = async (event) => {
  try {
    console.log(event);
    const res = await pgClient.query("SELECT * from posts");
    console.log(res);
    return formattedReturn(200, res);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};

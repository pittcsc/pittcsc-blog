const { pgClient } = require("./supabase");
const formattedReturn = require("./formattedReturn");

module.exports = async (event) => {
  try {
    const res = await pgClient.query("SELECT * from posts");
    return formattedReturn(200, res);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};

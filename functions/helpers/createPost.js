const { pgClient } = require("./supabase");
const formattedReturn = require("./formattedReturn");

const Discord = require("discord.js");
const getPosts = require("./getPosts");
const client = new Discord.Client({
  intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES],
});
client.login(process.env.BOT_CONNECTION);

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

module.exports = async (event) => {
  const body = JSON.parse(event.body);
  const pgQuery =
    "INSERT INTO posts(likes, title, author, tags) VALUES($1, $2, $3, $4)";
  const values = [0, body.title, body.author, body.tags];
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
    client.on("ready", () => {
      let str =
        "A new post has been made on the blog! The name of the post is " +
        values[1] +
        " and is written by " +
        values[2] +
        ". Go check it out!!\n";
      client.channels.cache.get("933196235559534612").send(str);
    });
    return formattedReturn(200, "Successfully Added New Row!");
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};

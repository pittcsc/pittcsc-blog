const axios = require("axios");
const { pgClient } = require("./supabase");
const formattedReturn = require("./formattedReturn");

// const Discord = require("discord.js");

// const client = new Discord.Client({
//   intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES],
// });
// client.login(process.env.BOT_CONNECTION);

// client.on("ready", () => {
//   console.log(`Logged in as ${client.user.tag}!`);
// });

module.exports = async (event) => {
  const body = JSON.parse(event.body);
  const pgQuery =
    "INSERT INTO posts(likes, title, author, tags) VALUES($1, $2, $3, $4)";
  const values = [0, body.title, body.author, body.tags];
  // console.log(event.headers.referer);
  console.log(event);
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

    const roleIDs = {
      "panther ml":824302386637045780,
      "game dev":784871450087522345,
      "pitt cyber security":878053832570056725,
      "robotics":932105908807409664,
      "algo trading":794416243339034624,
      "swift dev":799460107200888874,
      "web dev":803450886663307265,
      "math in cs":868499498622668810,
      "rust dev":891706189874876437
    }

    let tags = "";
    for (let i = 0; i < values[3].length; i++) {
      if (roleIDs[values[3][i]] != undefined && values[3][i].toLowerCase() != "here" && values[3][i].toLowerCase() != "everyone") {
        tags += "<@&" + roleIDs[values[3][i]] + "> ";
      }
    }
    const discordParams = {
      content: tags + "A new post was made on the blog!",
      embeds: [
        {
          title: `${body.title}`,
          description:
            "Blog posts and articles written by members of the computer science club at the University of Pittsburgh.",
          url: `${event.headers.referer}`,
          color: 16758812,
          author: {
            name: `${body.author}`,
          },
          thumbnail: {
            url: "https://pittcsc-blog.netlify.app/images/Pitt_CSC_Blog_OG_Image.png",
          },
        },
      ],
    };

    const response = await axios.post(
      process.env.DISCORD_WEBHOOK,
      discordParams
    );

    console.log(response);

    return formattedReturn(200, "Successfully Added New Row!");
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};

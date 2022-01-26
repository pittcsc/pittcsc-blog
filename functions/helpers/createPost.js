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
    // client.on("ready", () => {
    //   let str = "";
    //   for (let i = 0; i < values[3].length; i++) {
    //     if (values[3][i].toLowerCase() != "here" && values[3][i].toLowerCase() != "everyone") {
    //       str += "@ " + values[3][i] + " ";
    //     }
    //   }
    //   str += "A new post has been made on the blog! The name of the post is " +
    //     values[1] +
    //     " and is written by " +
    //     values[2] +
    //     ". Go check it out!!\n";
    //     // event.headers.referer;
    //   client.channels.cache.get("935758061228945418").send(str);
    // });
    let tags = "";
    for (let i = 0; i < values[3].length; i++) {
      if (values[3][i].toLowerCase() != "here" && values[3][i].toLowerCase() != "everyone") {
        tags += "@" + values[3][i] + " ";
      }
    }
    const discordParams = {
      content: tags + "A new post was made on the blog!",
      allowed_mentions: {
        parse: ["users", "roles"],
        users: [],
        roles: values[3]
      },
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

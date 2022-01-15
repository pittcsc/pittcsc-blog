// const fetch = require("node-fetch");
// var pg = require("pg");

const formattedReturn = require("./helpers/formattedReturn");
const dislikePost = require("./helpers/dislikePost");
const likePost = require("./helpers/likePost");
const getPosts = require("./helpers/getPosts");

exports.handler = async (event) => {
  if (event.httpMethod === "GET") {
    return await getPosts(event);
  } else if (event.httpMethod === "POST") {
    if (JSON.parse(event.body).like == "increment") {
      return await likePost(event);
    } else if (JSON.parse(event.body).like == "decrement") {
      return await dislikePost(event);
    }
  } else {
    return formattedReturn(405, {});
  }
};

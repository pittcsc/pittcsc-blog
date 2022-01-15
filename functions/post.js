// const fetch = require("node-fetch");
// var pg = require("pg");

const formattedReturn = require("./helpers/formattedReturn");
const dislikePost = require("./helpers/dislikePost");
const likePost = require("./helpers/likePost");
const getPosts = require("./helpers/getPosts");
const createPost = require("./helpers/createPost");

exports.handler = async (event) => {
  if (event.httpMethod === "GET") {
    return await getPosts(event);
  } else if (event.httpMethod === "PUT") {
    if (JSON.parse(event.body).like == "increment") {
      return await likePost(event);
    } else if (JSON.parse(event.body).like == "decrement") {
      return await dislikePost(event);
    }
  } else if (event.httpMethod === "POST") {
    return await createPost(event);
  } else {
    return formattedReturn(405, {});
  }
};

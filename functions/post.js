// const fetch = require("node-fetch");
// var pg = require("pg");

const formattedReturn = require("./helpers/formattedReturn");
const dislikePost = require("./helpers/dislikePost");
const likePost = require("./helpers/likePost");

exports.handler = async (event) => {
  const body = JSON.parse(event.body);
  // console.log(body);
  if (body.like == "increment") {
    return await likePost(event);
  } else if (body.like == "decrement") {
    return await dislikePost(event);
  } else {
    return formattedReturn(405, {});
  }
};

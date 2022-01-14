var pg = require("pg");

async function registerLike(title) {
  const connectionString =
    "postgres://postgres:pittcscblogsrock@db.httmchjxjclwidvyocby.supabase.co:6543/postgres";

  const l = JSON.parse(localStorage.getItem("likes"));

  const isPresent = (element) => element === title;

  if (l != null || l != undefined) {
    if (!l.some(isPresent)) {
      localStorage.setItem("likes", JSON.stringify([...l, title]));
      var pgClient = new pg.Client(connectionString);
      pgClient.connect();
      pgClient.query(
        "UPDATE posts SET likes = likes + 1 WHERE title = " + title
      );
    } else {
      const filteredArray = l.filter((el) => {
        return el !== title;
      });

      localStorage.setItem("likes", JSON.stringify(filteredArray));
    }
  } else {
    localStorage.setItem("likes", JSON.stringify([title]));
  }
}

const likeButton = document.querySelector("#likeButton");

const l = JSON.parse(localStorage.getItem("likes"));

const isPresent = (element) =>
  element === likeButton.getAttribute("data-title");

if (l != null || l != undefined) {
  if (!l.some(isPresent)) {
    likeButton.classList.add("filled-heart");
  }
}

likeButton.addEventListener("click", async () => {
  registerLike(likeButton.getAttribute("data-title"));
  likeButton.classList.toggle("filled-heart");
});

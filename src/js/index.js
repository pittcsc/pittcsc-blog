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
const shareButton = document.querySelector("#shareButton");
const shareButtonPopup = document.querySelector("#postSharePopup");

const l = JSON.parse(localStorage.getItem("likes"));

const isPresent = (element) =>
  element === likeButton.getAttribute("data-title");

if (l != null || l != undefined) {
  if (l.some(isPresent)) {
    likeButton.classList.add("filled-heart");
  }
}

likeButton.addEventListener("click", async () => {
  registerLike(likeButton.getAttribute("data-title"));
  likeButton.classList.toggle("filled-heart");
});

shareButton.addEventListener("click", () => {
  if (navigator.share) {
    navigator
      .share({
        title: document.title,
        url: window.location.href,
      })
      .then(() => {
        console.log("Thanks for sharing!");
      })
      .catch(console.error);
  } else {
    if (shareButtonPopup.classList.contains("popup-appear")) {
      shareButtonPopup.classList.remove("popup-appear");
    }
    const cb = navigator.clipboard;
    cb.writeText(window.location.href).then(() => {
      shareButtonPopup.classList.toggle("popup-appear");
    });
  }
});

const likeButton = document.querySelector("#likeButton");
const postLikeCount = document.querySelector("#postLikeCount");
const shareButton = document.querySelector("#shareButton");
const shareButtonPopup = document.querySelector("#postSharePopup");
const postAuthor = document.querySelector("#postAuthor");
const tagElements = document.querySelectorAll(".tag-text");

// let myrng = new Math.seedrandom("hello.");
// console.log(myrng()); // Always 0.9282578795792454
// console.log(myrng());

// function getRandomInt(max) {
//   return Math.floor(myrng() * max);
// }

// const tagColors = ["#fef3c7", "#cffafe", "#ecfccb", "#ede9fe"];

async function registerLike(title) {
  const l = JSON.parse(localStorage.getItem("likes"));

  const isPresent = (element) => element === title;

  if (l != null && l != undefined) {
    if (!l.some(isPresent)) {
      localStorage.setItem("likes", JSON.stringify([...l, title]));
      const like = "increment";

      const res = await fetch("/api/post", {
        method: "PUT",
        body: JSON.stringify({
          title,
          like,
        }),
      });
      const body = await res.json();

      // Uncomment this to show supabase response
      // console.log(body);

      let likeCount = parseInt(postLikeCount.textContent);
      likeCount++;
      postLikeCount.textContent = likeCount.toString();
    } else {
      const filteredArray = l.filter((el) => {
        return el !== title;
      });
      localStorage.setItem("likes", JSON.stringify(filteredArray));

      const like = "decrement";

      const res = await fetch("/api/post", {
        method: "PUT",
        body: JSON.stringify({
          title,
          like,
        }),
      });
      const body = await res.json();

      // Uncomment this to show supabase response
      // console.log(body);

      let likeCount = parseInt(postLikeCount.textContent);
      likeCount--;
      postLikeCount.textContent = likeCount.toString();
    }
  } else {
    localStorage.setItem("likes", JSON.stringify([title]));
    const like = "increment";

    const res = await fetch("/api/post", {
      method: "PUT",
      body: JSON.stringify({
        title,
        like,
      }),
    });
    const body = await res.json();

    // Uncomment this to show supabase response
    // console.log(body);

    let likeCount = parseInt(postLikeCount.textContent);
    likeCount++;
    postLikeCount.textContent = likeCount.toString();
  }
}

async function getInitialLikeCount(title) {
  const res = await fetch("/api/post");
  const body = await res.json();
  console.log(body);

  const filteredArray = body.rows.filter((el) => {
    return el.title === title;
  });

  if (filteredArray.length > 0) {
    postLikeCount.textContent = filteredArray[0].likes.toString();
  } else {
    const author = postAuthor.textContent;
    const tags = Array.from(tagElements).map((tag) => {
      return tag.getAttribute("data-tag");
    });

    postLikeCount.textContent = "0";
    const res = await fetch("/api/post", {
      method: "POST",
      body: JSON.stringify({
        title,
        author,
        tags,
      }),
    });
    const body = await res.json();
    console.log(body);
  }

  const l = JSON.parse(localStorage.getItem("likes"));

  const isPresent = (element) =>
    element === likeButton.getAttribute("data-title");

  if (l != null || l != undefined) {
    if (l.some(isPresent)) {
      likeButton.classList.add("filled-heart");
    }
  }
}

getInitialLikeCount(likeButton.getAttribute("data-title"));

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

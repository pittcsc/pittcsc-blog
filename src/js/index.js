const likeButton = document.querySelector("#likeButton");
const postLikeCount = document.querySelector("#postLikeCount");
const shareButton = document.querySelector("#shareButton");
const shareButtonPopup = document.querySelector("#postSharePopup");

async function registerLike(title) {
  const l = JSON.parse(localStorage.getItem("likes"));

  const isPresent = (element) => element === title;

  if (l != null && l != undefined) {
    if (!l.some(isPresent)) {
      localStorage.setItem("likes", JSON.stringify([...l, title]));
      const like = "increment";

      const res = await fetch("/api/post", {
        method: "POST",
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
        method: "POST",
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
  }
}

const l = JSON.parse(localStorage.getItem("likes"));

const isPresent = (element) =>
  element === likeButton.getAttribute("data-title");

if (l != null || l != undefined) {
  if (l.some(isPresent)) {
    likeButton.classList.add("filled-heart");
    let likeCount = parseInt(postLikeCount.textContent);
    likeCount++;
    postLikeCount.textContent = likeCount.toString();
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

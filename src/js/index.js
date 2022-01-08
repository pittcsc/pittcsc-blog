function registerLike(title) {
  const l = JSON.parse(localStorage.getItem("likes"));

  const isPresent = (element) => element === title;

  if (l != null || l != undefined) {
    if (!l.some(isPresent)) {
      localStorage.setItem("likes", JSON.stringify([...l, title]));
    } else {
      const filteredArray = l.filter((el) => {
        return el !== title;
      });

      console.log("Filtered Array", filteredArray);

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
  if (l.some(isPresent)) {
    likeButton.classList.add("filled-heart");
  }
}

likeButton.addEventListener("click", () => {
  likeButton.classList.toggle("filled-heart");
  console.log(likeButton);
  console.log(likeButton.classList);
});

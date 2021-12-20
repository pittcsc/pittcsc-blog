function registerLike() {
  const name = document.querySelector(".post-title");
  const btn = document.querySelector(".post-like");

  const l = localStorage.getItem("likes");
  (l == null) | undefined ? (likes = "") : null;

  btn.addEventListener("click", () => {
    localStorage.setItem("likes", [likes, name.innerHTML.toString()]);
  });
  console.log(name.innerHTML.toString());
}

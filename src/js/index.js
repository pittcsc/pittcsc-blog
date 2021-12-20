function registerLike(title) {
  const l = JSON.parse(localStorage.getItem("likes"));

  const isPresent = (element) => element === title;

  if (l != null || l != undefined) {
    if (!l.some(isPresent)) {
      localStorage.setItem("likes", JSON.stringify([...l, title]));
    }
  } else {
    localStorage.setItem("likes", JSON.stringify([title]));
  }

  // (l != null) | (l != undefined) && !l.some(isPresent)
  //   ? localStorage.setItem("likes", JSON.stringify([...l, title]))
  //   : localStorage.setItem("likes", JSON.stringify([title]));
}

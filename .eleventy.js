module.exports = function (eleventyConfig) {
  eleventyConfig.addWatchTarget("./src/sass/");
  eleventyConfig.addPassthroughCopy("./src/css");
  eleventyConfig.addPassthroughCopy("./src/js");
  eleventyConfig.addPassthroughCopy("./src/images");
  eleventyConfig.addPassthroughCopy("./src/apple-touch-icon.png");
  eleventyConfig.addPassthroughCopy("./src/favicon-16x16.png");
  eleventyConfig.addPassthroughCopy("./src/favicon-32x32.png");
  eleventyConfig.setDataDeepMerge(true);

  function filterTagList(tags) {
    return (tags || []).filter(
      (tag) => ["all", "nav", "post", "posts"].indexOf(tag) === -1
    );
  }

  eleventyConfig.addNunjucksFilter("filterTagList", filterTagList);

<<<<<<< HEAD
  // eleventyConfig.addCollection("tagList", function(collection) {
  //   let tagSet = new Set();
  //   collection.getAll().forEach(item => {
  //     (item.data.tags || []).forEach(tag => tagSet.add(tag));
  //   });

  //   return tagSet;
  // });

  eleventyConfig.addCollection("tagList", function(collection) {
    let tagSet = new Set();
    collection.getAll().forEach(post => {
      let curr = new Set(post.data.tags);
      let temp = tagSet;
      tagSet = new Set([...temp, ...curr]);
    });
    return tagSet;
=======
  eleventyConfig.addFilter("log", (value) => {
    console.log(value);
>>>>>>> main
  });

  return {
    dir: {
      input: "src",
      output: "public",
    },
  };
};

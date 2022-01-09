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

  eleventyConfig.addFilter("log", (value) => {
    console.log(value);
  });

  return {
    dir: {
      input: "src",
      output: "public",
    },
  };
};

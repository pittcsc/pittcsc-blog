const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(syntaxHighlight);
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

  eleventyConfig.addCollection("tagList", function (collection) {
    let tagSet = new Set();
    // tagSet.add("game dev");
    // tagSet.add("panther ml");
    // tagSet.add("pitt cyber security");
    // tagSet.add("robotics");
    // tagSet.add("algo trading");
    // tagSet.add("swift dev");
    // tagSet.add("math in cs");
    // tagSet.add("rust dev");
    collection.getAll().forEach((item) => {
      if (item.data.tags != undefined) {
        (item.data.tags || []).forEach((tag) => tagSet.add(tag));
      }
    });
    tagSet.delete("posts");
    return tagSet;
  });

  eleventyConfig.addShortcode("excerpt", (article) => extractExcerpt(article));

  return {
    dir: {
      input: "src",
      output: "public",
    },
  };
};

function extractExcerpt(article) {
  if (!article.hasOwnProperty("templateContent")) {
    console.warn(
      'Failed to extract excerpt: Document has no property "templateContent".'
    );
    return null;
  }

  let excerpt = null;
  const content = article.templateContent;

  // The start and end separators to try and match to extract the excerpt
  const separatorsList = [
    { start: "<!-- Excerpt Start -->", end: "<!-- Excerpt End -->" },
    { start: "<p>", end: "</p>" },
  ];

  separatorsList.some((separators) => {
    const startPosition = content.indexOf(separators.start);
    const endPosition = content.indexOf(separators.end);

    if (startPosition !== -1 && endPosition !== -1) {
      excerpt = content
        .substring(startPosition + separators.start.length, endPosition)
        .trim();
      return true; // Exit out of array loop on first match
    }
  });
  return excerpt;
}

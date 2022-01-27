<div style="width: 50%; margin: auto;">
  <img src="./src/images/Pitt_CSC_Blog_OG_Image.png" />
</div>

# Table of contents

- [Table of contents](#table-of-contents)
- [Contributing](#contributing)
- [GitHub issues](#github-issues)
  - [Reporting bugs](#reporting-bugs)
  - [Feedback](#feedback)
- [Developers](#developers)
  - [Directory structure](#directory-structure)
  - [Running locally](#running-locally)

# Contributing

Contributing to the Pitt CSC blogs is very simple. You can report bugs or issues or you can tell us about any cool ideas or improvements you think can be made. Developers can even clone the repo and run the blog website locally, although if you do want complete functions you'll have to reach out to an officer to get additional info (like environment variables).

# GitHub issues

Currently we have 2 pinned GitHub issues: [Issues, Bugs, Broken Code](https://github.com/pittcsc/pittcsc-blog/issues/20) and [Ideas, Improvements, and Feedback](https://github.com/pittcsc/pittcsc-blog/issues/21).

## Reporting bugs

To report bugs all you have to do is open a new GitHub issue following the guidelines in [Issues, Bugs, Broken Code](https://github.com/pittcsc/pittcsc-blog/issues/20) (be sure to add the `bug`label!). Our officers will review the bug and see what we can do to fix it.

## Feedback

We're always open to feedback! The more the merrier! Feel free to comment under [Ideas, Improvements, and Feedback](https://github.com/pittcsc/pittcsc-blog/issues/21) with anything you think we could change, add or remove!

# Developers

Any curious devs have the possibility of cloning the repo and working on the website on their local machine!

## Directory structure

```
+-- functions -> folder housing our Netlify ✨Serverless Functions✨
|
+-- instructions -> folder containing tutorial photos
|
+-- src -> where the 🔥sauce🔥 is stored
   |
   +-- _data      -> 11ty helper folder with global variables
   +-- _includes  -> Nunjucks templates used for rendering
   +-- css        -> folder containing CSS styling
   +-- images     -> folder containing post images
   +-- js         -> folder containing JS helper functions
   +-- posts      -> folder housing posts
   +-- sass       -> folder containg SCSS styling
```

## Running locally

Once you clone the repo on your local machine you can run it using `npm run start`. The command will run the `build:sass`and `watch:*` commands in parallel. The SASS styiling will be compiled into CSS and Eleventy will serve the website to localhost.

**Disclaimer**
Our website uses Netlify Serverless Functions (`functions/`folder) that require additional configuration. If you want to run the complete version of the blogs website, with complete functionality just reach out and we'll get you set up!

---
title: Understanding React (for Dummies)
author: Niccolo Nobili
tag: ["react", "web dev"]
date: 2022-01-03
---

# Understanding React (for dummies)

_This is a very very very simple introduction to React_

React is wonderful, it’s flashy, it’s cool, and it seems everybody’s using it. And while it might be tempting to use _create-react-app_ to get a website up and running in a couple minutes I think it’s really important for any developer to truly understand what’s happening behind the scenes. One-click wonders are useful for practice, but not in the real world.

There’s 2 parts to React: React itself (all the components, the pages, the utils you write) and then there’s pre-processing. I think it's easier to describe React first and then move on to pre-processing. Also, this isn’t going be a super technical, or at least “technically correct” overview of things, I’ll try my best to be as brief and make things as less technical as possible.

React, to put it simply, is a library that lets you build dynamic and interactive websites. What makes it so powerful is that it’s modular, you can use as much or as little of it (or it’s accompanying libraries) as you want. Plus, the world of React is enormous (just the repo has 180k⭐️). There’s plenty of documentation, tutorials, and answered questions online, all you need to do is look and you’ll find the answer to any problem you could have. As far as using React there isn’t much to it, you can think of it as a combination of JavaScript and HTML, all in one file. The same file can contain both JS functions and React components, which are React’s way of understanding HTML. And even better, you can write plain old HTML in React files!

<!-- ![React example](../../images/react-example.png) -->

<img src="../../images/react-example.png" alt="React Example" style="scale: 0.75;" />
<div align="center">React code example: returns the name and color of the cat</div>

Next comes preprocessing. You might be asking yourself: how exactly does this funky JS/HTML stuff I write become HTML and JS the browser understands? This is where the power of React comes in. In React, you can use functions that return fragments, or better said, return what will be rendered in the browser window. This makes it very powerful, one can be very very picky with what they want to show. What React will do is it will ✨magically✨ convert whatever you wrote into JS and HTML, separating them and allowing the browser to understand it. I won't go to in-depth but basically React creates HTML and JS files that are then served to the browser. If you use something like _create-react-app_ all this will happen automatically, the process is already configured. If you were to instead do a barebones implementation you would need to manually setup Babel and Webpack, which what actually makes the processing possible.

Now, I wish it was as easy as it appears in this post, but it isn't. This is a very very toned downed version of an amazing tool that every developer should at least try. Going in depth requires time and patience, and a lot (and a lot more) experimenting and tinkering with the library. And FYI, I didn't even dive into this like state, Redux, API interaction and **so much more**.

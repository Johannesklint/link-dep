# link-dep

Module to link dependencies to static folder.
For some reason you might want to use a install dependency in let's say your index.html file which might be served from `express`

## Usage

Pass in a string as the first argument

```jsx
const linkDep = require("link-dep");

await linkDep("fs-extra", "./public/scripts");
```

Pass in an array as the first argument for copying multiple dependencies.

```jsx
const linkDep = require("link-dep");

await linkDep(["fs-extra", "chalk"], "./public/scripts");
```

---

#### util function with try / catch

```jsx
const linkDep = require("link-dep");

async function copy() {
  try {
    await linkDep("fs-extra", "./public/scripts");
  } catch (error) {
    throw new Error("Noo", error);
  }
}
…
await copy();
```

#### then / catch

```jsx
const linkDep = require("link-dep");

linkDep("fs-extra", "./public/scripts")
  .then(() => console.log("Yes!"))
  .catch(() => console.error("Something went wrong!"));
```

#### Together with [express](https://expressjs.com/)

```js
const path = require("path");
const express = require("express");
const linkDep = require("link-dep");

const app = express();
// `sayHi`-module doesn't exist, its created at the bottom, btw it's really complex. 🧠
await linkDep("say-hi", "./public/scripts");

app.use("/static", express.static(path.join(`${__dirname}/public`)));
app.get("/", (req, res) => {
  res.sendFile("./index.html");
});

// index.html
<script src="static/script/some-dependency">
// some-depenedency will now be ran

…………………………………………………………………………………………………………………………………………………………

// say-hi module 
module.exports = console.log("I'm saying hi");
```

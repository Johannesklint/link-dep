# link-dep

Module to link dependencies to static folder

## Usage

Pass in a string as the first argument

```jsx
const linkDep = require("link-dep");

await linkDep("fs-extra", "./public/scripts");
```

Pass in an array as the first argument for copying multiple directories.

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

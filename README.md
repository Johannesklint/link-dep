# link-dep

Module to link dependencies to static folder

## Usage

Pass in a string as the first argument

```jsx
await linkDependencies("fs-extra", "./public/scripts");
```

Pass in an array as the first argument for copying multiple directories.

```jsx
await linkDependencies(["fs-extra", "chalk"], "./public/scripts");
```
---
#### util function with try / catch
```jsx
async function copy() {
  try {
    await linkDependencies("fs-extra", "./public/scripts");
  } catch (error) {
    throw new Error("Noo", error);
  }
}
…
await copy();
```

#### then / catch

```jsx
linkDependencies("fs-extra", "./public/scripts")
  .then(() => console.log("Yes!"))
  .catch(() => console.error("Something went wrong!"));
```

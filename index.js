const fs = require("fs-extra");
const path = require("path");

function errorHandling(target, destination) {
  if (typeof destination !== "string") {
    throw new Error(`Not a valid destination folder: ${destination}`);
  }
  if (typeof target !== "string") {
    if (Array.isArray(target)) {
      return;
    }
    throw new Error(`Not a valid target folder(s): ${target}`);
  }
}

function getTargets(target) {
  if (Array.isArray(target)) {
    return target;
  }
  return [target];
}

/**
 *
 * @param {String} target dependency target
 * @param {String} dest destination where the dependency(target) will end up. for example ./public/build
 * @returns {Promise} Will be resolved when the target has been copied
 */
function linkDependencies(target, destination) {
  errorHandling(target, destination);

  fs.mkdirpSync(destination);

  const promise = getTargets(target).map((depName) => {
    const depSource = path.resolve(path.join("./node_modules", depName));
    const depDestination = path.resolve(path.join(destination, depName));

    return new Promise((resolve) => {
      fs.ensureDir(depDestination, resolve);
    })
      .then(
        (err) =>
          new Promise((resolve) => {
            if (err) {
              resolve();
            } else {
              fs.remove(depDestination, resolve);
            }
          })
      )
      .then(
        () =>
          new Promise((resolve) => {
            fs.symlink(depSource, depDestination, "dir", resolve);
          })
      )
      .catch(console.error);
  });

  return Promise.all(promise);
}

module.exports = linkDependencies;

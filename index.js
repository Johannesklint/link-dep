/**
 * 
 * @param {String} target dependency target  
 * @param {String} dest destination where the dependency(target) will end up. for example ./public/build
 * @returns {Promise} Will be resolved when the target has been copied
 */
function linkDependencies(target, dest) {
  if (typeof dest !== "string" || typeof target !== "string") {
    throw new Error(`Not a valid destination folder: ${dest || target}`);
  }

  fs.mkdirpSync(dest);
  const rLinkSource = path.join("./node_modules", target);
  const linkSource = path.resolve(rLinkSource);
  const rLinkDestiny = path.join(dest, target);
  const linkDestiny = path.resolve(rLinkDestiny);

  return new Promise((resolve) => {
    fs.access(linkDestiny, fs.F_OK, resolve);
  })
    .then(
      (err) =>
        new Promise((resolve) => {
          if (err) {
            resolve();
          } else {
            fs.unlink(linkDestiny, resolve);
          }
        })
    )
    .then(
      () =>
        new Promise((resolve) => {
          fs.symlink(linkSource, linkDestiny, "dir", resolve);
        })
    )
    .catch(console.error);
}

module.exports = linkDependencies;

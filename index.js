const fs = require('fs-extra')
const path = require('path')

function errorHandling(target, destination) {
  if (typeof destination !== 'string') {
    throw new Error(`Not a valid destination folder: ${destination}`);
  }
  if (typeof target !== 'string') {
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

  const promise = getTargets(target).map(depName => {
    const rLinkSource = path.join('./node_modules', depName);
    const rLinkDestiny = path.join(destination, depName);

    const linkSource = path.resolve(rLinkSource);
    const linkDestiny = path.resolve(rLinkDestiny);

    return new Promise(resolve => {
      fs.ensureDir(linkDestiny, resolve);
    })
      .then(
        err =>
          new Promise(resolve => {
            if (err) {
              resolve();
            } else {
              fs.remove(linkDestiny, resolve);
            }
          }),
      )
      .then(
        () =>
          new Promise(resolve => {
            fs.symlink(linkSource, linkDestiny, 'dir', resolve);
          }),
      )
      .catch(console.error);
  });

  return Promise.all(promise);
}

module.exports = linkDependencies;

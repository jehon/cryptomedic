/* exported background */

function background(fn, ...args) {
  setTimeout(fn, 10, ...args);
}

const loaded = false;
const a = require('./module_a');
console.log(a);
module.exports = {
  aWasLoaded: a.loaded,
  loaded: loaded,
};

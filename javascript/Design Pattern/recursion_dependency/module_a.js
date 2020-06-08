const b = require('./module_b');
module.exports = {
  bWasLoaded: b.loaded,
  loaded: true,
};

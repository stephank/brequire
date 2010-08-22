// Brequire - CommonJS support for the browser
function require(path) {
  var module = require.modules[path];
  if(!module) {
    throw("couldn't find module for: " + path);
  }
  if(!module.exports) {
    module.exports = {};
    module.call(module.exports, module, module.exports, require.bind(path));
  }
  return module.exports;
}

require.modules = {};

require.bind = function(path) {
  return function(p) {
    var fullPath = path.split('/');
    fullPath.pop();
    var parts = p.split('/');
    for (var i = 0, length = parts.length; i < length; i++) {
      var part = parts[i];
      if (part == '..') fullPath.pop();
      else if (part != '.') fullPath.push(part);
    }
    return require(fullPath.join('/'));
  };
};

require.module = function(path, fn) {
  require.modules[path] = fn;
};
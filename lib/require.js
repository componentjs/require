
/**
 * Require the given path.
 *
 * @param {String} path
 * @return {Object} exports
 * @api public
 */

function require(p, parent, orig){
  var path = require.resolve(p)
    , mod = require.modules[path];

  // lookup failed
  if (null == path) {
    orig = orig || p;
    parent = parent || 'root';
    throw new Error('failed to require "' + orig + '" from "' + parent + '"');
  }

  // perform real require()
  // by invoking the module's
  // registered function
  if (!mod.exports) {
    mod.exports = {};
    mod.client = mod.component = true;
    mod.call(mod.exports, mod, mod.exports, require.relative(path));
  }

  return mod.exports;
}

/**
 * Registered modules.
 */

require.modules = {};

/**
 * Resolve `path`.
 *
 * Lookup:
 *
 *   - PATH/index.js
 *   - PATH.js
 *   - PATH
 *
 * @param {String} path
 * @return {String} path or null
 * @api public
 */

require.resolve = function(path){
  var orig = path
    , reg = path + '.js'
    , index = path + '/index.js';

  return require.modules[reg] && reg
    || require.modules[index] && index
    || require.modules[orig] && orig
    || null;
};

/**
 * Register module at `path` with callback `fn`.
 *
 * @param {String} path
 * @param {Function} fn
 * @api public
 */

require.register = function(path, fn){
  require.modules[path] = fn;
};

/**
 * Return a require function relative to the `parent` path.
 *
 * @param {String} parent
 * @return {Function}
 * @api private
 */

require.relative = function(parent) {

  /**
   * The relative require() itself.
   */

  function fn(path){
    return require(fn.resolve(path), parent, path);
  }

  /**
   * Normalize path.
   */

  function normalize(p){
    if ('.' != p[0]) return p;
    
    var path = parent.split('/');
    var segs = p.split('/');

    if ('.' == path[0][0] || 'index.js' == path[path.length - 1]) path.pop();
    
    for (var i = 0; i < segs.length; i++) {
      var seg = segs[i];
      if ('..' == seg) path.pop();
      else if ('.' != seg) path.push(seg);
    }

    return path.join('/');
  };

  /**
   * Resolve relative to the parent.
   */

  fn.resolve = function(path){
    if ('.' != path[0]) path = './deps/' + path;
    return require.resolve(normalize(path));
  };

  /**
   * Check if module is defined at `path`.
   */

  fn.exists = function(path){
    return !! require.modules[fn.resolve(path)];
  };

  return fn;
};

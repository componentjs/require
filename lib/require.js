
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
 * Registered aliases.
 */

require.aliases = {};

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
 * @api private
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
 * Normalize `path` relative to the current path.
 *
 * @param {String} curr
 * @param {String} path
 * @return {String}
 * @api private
 */

require.normalize = function(curr, path) {
  var segs = [];

  // foo
  if ('.' != path[0]) return path;

  curr = curr.split('/');
  path = path.split('/');

  for (var i = 0; i < path.length; ++i) {
    if ('..' == path[i]) {
      curr.pop();
    } else if ('.' != path[i] && '' != path[i]) {
      segs.push(path[i]);
    }
  }

  return curr.concat(segs).join('/');
};

/**
 * Register module at `path` with callback `fn`.
 *
 * @param {String} path
 * @param {Function} fn
 * @api private
 */

require.register = function(path, fn){
  require.modules[path] = fn;
};

/**
 * Alias a module definition.
 *
 * @param {String} from
 * @param {String} to
 * @param {String} scope
 * @api private
 */

require.alias = function(from, to, scope){
  var f = require.resolve(from);
  var fn = require.modules[f];
  if (!fn) throw new Error('failed to alias "' + from + '", it does not exist');
  var cfg = require.aliases[to];
  if (!cfg) cfg = require.aliases[to] = {};
  cfg[scope || ''] = from;
};

/**
 * @api private
 */

require.lookupAlias = function (parent, alias) {
  parent = parent || '';
  var path
    , length
    , cfg = require.aliases[alias];

  for (var key in cfg) {
    if (parent.indexOf(key) == 0) {
      var l = parent.length - key.length;
      if (l < length || length == null) {
        path = cfg[key];
        length = l;
      }
    }
  }
  return path;
};

/**
 * Return a require function relative to the `parent` path.
 *
 * @param {String} parent
 * @return {Function}
 * @api private
 */

require.relative = function(parent) {
  var p = require.normalize(parent, '..')

  /**
   * The relative require() itself.
   */

  function fn(path){
    var orig = path;
    var alias = require.lookupAlias(p, require.normalize(p, path));
    path = alias ? alias : fn.resolve(path)
    return require(path, parent, orig);
  }

  /**
   * Resolve relative to the parent.
   */

  fn.resolve = function(path){
    if ('.' != path[0]) path = './deps/' + path;
    return require.normalize(p, path);
  };

  /**
   * Define scoped alias
   */

  fn.alias = function (from, to) {
    from = require.normalize(p, from)
    to = require.normalize(p, to)
    require.alias(from, to, p)
  };

  /**
   * Check if module is defined at `path`.
   */

  fn.exists = function(path){
    return !! require.modules[fn.resolve(path)];
  };

  return fn;
};
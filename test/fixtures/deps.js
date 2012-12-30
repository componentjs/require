
require.register('foo/index.js', function(exports, require, module){
  module.exports = require('bar');
});

require.register('foo/deps/bar/index.js', function(exports, require, module){
  module.exports = require('baz');
});

require.register('foo/deps/bar/deps/baz', function(exports, require, module){
  module.exports = 'baz';
});
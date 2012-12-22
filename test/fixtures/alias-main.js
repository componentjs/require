
require.register('foo/index.js', function(exports, require, module){
  module.exports = require('bar');
});

require.register('bar/stuff.js', function(exports, require, module){
  module.exports = 'bar';
});

require.alias('bar/stuff.js', 'foo/deps/bar/index.js');
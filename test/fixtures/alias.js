
require.register('foo/index.js', function(exports, require, module){
  module.exports = require('bar');
});

require.register('bar/index.js', function(exports, require, module){
  module.exports = 'bar';
});

require.alias('bar/index.js', 'foo/deps/bar/index.js');
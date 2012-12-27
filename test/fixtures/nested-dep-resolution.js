
require.register('foo/index.js', function(exports, require, module){
  module.exports = 'foo';
});

require.register('bar/index.js', function(exports, require, module){
  module.exports = require('./lib/stuff');
});

require.register('bar/lib/stuff/index.js', function(exports, require, module){
  module.exports = require('foo');
});

require.alias('foo/index.js', 'bar/deps/foo/index.js');
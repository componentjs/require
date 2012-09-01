
require.register('foo/index.js', function(module, exports, require){
  module.exports = 'foo';
});

require.register('bar/index.js', function(module, exports, require){
  module.exports = require('./lib/stuff');
});

require.register('bar/lib/stuff/index.js', function(module, exports, require){
  module.exports = require('foo');
});

require.alias('foo/index.js', 'bar/deps/foo/index.js');
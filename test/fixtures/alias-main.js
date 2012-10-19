
require.register('foo/index.js', function(module, exports, require){
  module.exports = require('bar');
});

require.register('bar/stuff.js', function(module, exports, require){
  module.exports = 'bar';
});

require.alias('bar/stuff.js', 'foo/deps/bar/index.js');
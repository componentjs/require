
require.register('foo/index.js', function(module, exports, require){
  module.exports = require('bar');
});

require.register('bar/index.js', function(module, exports, require){
  module.exports = 'bar';
});

require.alias('bar/index.js', 'foo/deps/bar/index.js');
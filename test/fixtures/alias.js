
require.register('foo/index.js', function(module, exports, require){
  module.exports = require('bar');
});

require.register('bar', function(module, exports, require){
  module.exports = 'bar';
});

require.alias('bar', 'foo/deps/bar');

require.register('foo', function(module, exports, require){
  module.exports = require('bar');
});

require.register('foo/deps/bar', function(module, exports, require){
  module.exports = require('baz');
});

require.register('foo/deps/bar/deps/baz', function(module, exports, require){
  module.exports = 'baz';
});

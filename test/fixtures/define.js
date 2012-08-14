require.register('foo', function(module, exports, require){
  exports.foo = 'foo';
});

require.register('bar', function(module, exports, require){
  module.exports = 'bar';
});

require.register('baz', function(module, exports, require){
  module.exports = require('bar');
});
require.register('foo', function(exports, require, module){
  exports.foo = 'foo';
});

require.register('bar', function(exports, require, module){
  module.exports = 'bar';
});

require.register('baz', function(exports, require, module){
  module.exports = require('bar');
});
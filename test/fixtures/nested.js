
require.register('foo', function(module, exports, require){
  module.exports = {
    bar: require('./bar'),
    baz: require('./bar/baz')
  }
});

require.register('foo/bar', function(module, exports, require){
  module.exports = require('./baz');
});

require.register('foo/bar/baz', function(module, exports, require){
  module.exports = 'baz';
});

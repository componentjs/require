
require.register('foo', function(module, exports, require){
  module.exports = {
    bar: require('./bar'),
    baz: require('./bar/baz')
  }
});

require.register('foo/bar/index.js', function(module, exports, require){
  module.exports = require('./baz');
});

require.register('foo/bar/baz/index.js', function(module, exports, require){
  module.exports = 'baz';
});

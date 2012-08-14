
require.register('foo', function(module, exports, require){
  module.exports = {
    bar: require('./bar')
  }
});

require.register('foo/bar', function(module, exports, require){
  module.exports = require('./baz');
});

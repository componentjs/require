
require.register('foo/index.js', function(exports, require, module){
  module.exports = {
    bar: require('./bar'),
    baz: require('./bar/baz')
  }
});

require.register('foo/bar/index.js', function(exports, require, module){
  module.exports = require('./baz');
});

require.register('foo/bar/baz/index.js', function(exports, require, module){
  module.exports = 'baz';
});

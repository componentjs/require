
require.register('foo/index.js', function(exports, require, module){
  module.exports = {
    bar: require('./bar')
  }
});

require.register('foo/bar', function(exports, require, module){
  module.exports = require('./baz');
});

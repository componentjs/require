
require.register('foo/bar.js', function(exports, require, module){
  module.exports = 'foo';
});

require.alias('foo/bar.js', 'foo/index.js');
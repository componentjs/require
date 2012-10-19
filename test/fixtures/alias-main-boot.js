
require.register('foo/bar.js', function(module, exports, require){
  module.exports = 'foo';
});

require.alias('foo/bar.js', 'foo/index.js');
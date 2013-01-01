require.register('meh.js', function(exports, require, module) {
  module.exports = require('/foo');
});

require.register('foo/index.js', function(exports, require, module){
  module.exports = require('/bar');
});

require.register('bar/index.js', function(exports, require, module){
  module.exports = 'hi';
});

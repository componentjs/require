
require.register('doesnt-exist', function(exports, require, module){
  module.exports = 'this shouldnt work';
});

require.register('foo/index.js', function(exports, require, module){
  module.exports = require('bar');
});

require.register('foo/deps/bar', function(exports, require, module){
  module.exports = require('doesnt-exist');
});

require.register('foo/deps/bar/deps/baz', function(exports, require, module){
  module.exports = 'baz';
});

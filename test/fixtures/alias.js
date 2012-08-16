
require.register('foo/bar/baz/index.js', function(module, exports, require){
  module.exports = require('alias');
});

require.register('foo/bar/index.js', function(module, exports, require){
  require.alias('../b', 'alias');
  module.exports = require('./baz');
});

require.register('foo/index.js', function (module, exports, require) {
  require.alias('c', './alias');
  module.exports = require('alias') + require('./bar') + require('./alias');
})

require.register('foo/b.js', function (module) {
  module.exports = 'b';
});

require.register('a/index.js', function (module) {
  module.exports = 'a';
});

require.register('c', function (module) {
  module.exports = 'c';
});

require.alias('a', 'alias');

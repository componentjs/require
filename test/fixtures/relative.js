
require.register('touch/index.js', function(module, exports, require){
  module.exports = require('./dispatcher');
});

require.register('touch/dispatcher.js', function(module, exports, require){
  module.exports = require('./touch');
});

require.register('touch/touch.js', function(module, exports, require){
  module.exports = 'touch';
});


require.register('touch/index.js', function(module, exports, require){
  module.exports = require('./touch/dispatcher');
});

require.register('touch/touch/dispatcher.js', function(module, exports, require){
  module.exports = require('../touch');
});

require.register('touch/touch.js', function(module, exports, require){
  module.exports = 'touch';
});

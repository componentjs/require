
require.register('touch/index.js', function(exports, require, module){
  module.exports = require('./touch/dispatcher');
});

require.register('touch/touch/dispatcher.js', function(exports, require, module){
  module.exports = require('../touch');
});

require.register('touch/touch.js', function(exports, require, module){
  module.exports = 'touch';
});

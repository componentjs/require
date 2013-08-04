
require.register('typeof/exports.js', function(exports, require, module){
    module.exports = typeof exports;
});

require.register('typeof/require.js', function(exports, require, module){
    module.exports = typeof require;
});

require.register('typeof/module.js', function(exports, require, module){
    module.exports = typeof module;
});

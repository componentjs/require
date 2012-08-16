require.register('foo', function (module, exports, require) {
    require.register('a', function (module) {
        module.exports = 'a';
    });

    require.register('b', function (module) {
        module.exports = 'b';
    });

    module.exports = require('./a') + require('./b');
});
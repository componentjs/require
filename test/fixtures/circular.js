var counter = {
  foo: 0,
  bar: 0
};

require.register('index', function(exports, require, module){
  module.exports = require('./foo');
  require('./bar');
});

require.register('foo', function(exports, require, module){
  exports.bar = require('./bar').bar;
  exports.foo = ++counter.foo;
});

require.register('bar', function(exports, require, module){
  require('./foo');
  exports.bar = ++counter.bar;
});

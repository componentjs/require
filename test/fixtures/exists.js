
require.register('foo/bar/baz', function(module, exports, require){

});

require.register('foo/bar/index.js', function(module, exports, require){
  module.exports = {
    baz: require.exists('./baz'),
    hey: require.exists('hey')
  };
});

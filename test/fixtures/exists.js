
require.register('foo/bar/baz', function(exports, require, module){

});

require.register('foo/bar/index.js', function(exports, require, module){
  module.exports = {
    baz: require.exists('./baz'),
    hey: require.exists('hey')
  };
});

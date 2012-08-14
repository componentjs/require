
/**
 * Module dependencies.
 */

var fs = require('fs')
  , vm = require('vm')
  , r = require('..')
  , read = fs.readFileSync;

function fixture(name) {
  return read('test/fixtures/' + name, 'utf8');
}

function eval(js, ctx) {
  ctx.console = console;
  return vm.runInNewContext(r + js + '\n', ctx);
}

function normalize(curr, path) {
  return eval('require.normalize("' + curr + '", "' + path + '")', {});
}

describe('require.register(name, fn)', function(){
  it('should define a module', function(){
    var js = fixture('define.js');
    var ret = eval(js + 'require("foo")', {});
    ret.foo.should.equal('foo');
  })

  it('should support module.exports', function(){
    var js = fixture('define.js');
    var ret = eval(js + 'require("bar")', {});
    ret.should.equal('bar');
  })

  it('should support nested require()s', function(){
    var js = fixture('nested.js');
    var ret = eval(js + 'require("foo")', {});
    ret.bar.should.equal('baz');
    ret.baz.should.equal('baz');
  })

  it('should support relative require()s', function(){
    var js = fixture('relative.js');
    var ret = eval(js + 'require("touch")', {});
    ret.should.equal('touch');
  })

  it('should support index.js', function(){
    var js = fixture('index.js');
    var ret = eval(js + 'require("foo")', {});
    ret.bar.should.equal('baz');
    ret.baz.should.equal('baz');
  })

  it('should support ./deps', function(){
    var js = fixture('deps.js');
    var ret = eval(js + 'require("foo")', {});
    ret.should.equal('baz');
  })

  it('should report errors relative to the parent', function(done){
    try {
      var js = fixture('error.js');
      var ret = eval(js + 'require("foo")', {});
    } catch (err) {
      err.message.should.equal('failed to require "./baz" from "foo/bar"');
      done();
    }
  })

  it('should report dep errors relative to the parent', function(done){
    try {
      var js = fixture('deps-error.js');
      var ret = eval(js + 'require("foo")', {});
    } catch (err) {
      err.message.should.equal('failed to require "doesnt-exist" from "foo/deps/bar"');
      done();
    }
  })
})

describe('require.normalize(curr, path)', function(){
  it('should resolve foo', function(){
    normalize('touch/dispatcher.js', 'foo')
      .should.equal('foo');
  })

  it('should resolve ./foo', function(){
    normalize('touch/dispatcher.js', './touch')
      .should.equal('touch/touch');
  })

  it('should resolve ./foo when the parent is index.js', function(){
    normalize('touch/index.js', './dispatcher')
      .should.equal('touch/dispatcher');
  })

  it('should resolve ..', function(){
    normalize('touch/dispatcher.js', '..')
      .should.equal('touch');

    normalize('touch/dispatcher/foo.js', '..')
      .should.equal('touch/dispatcher');

    normalize('touch/dispatcher/foo.js', '../../')
      .should.equal('touch');
  })
})

describe('require.alias(from, to)', function(){
  it('should alias a module definition', function(){
    var js = fixture('alias.js');
    var ret = eval(js + 'require("foo")', {});
    ret.should.equal('bar');
  })
})

describe('require.exists(name)', function(){
  it('should check if a module is defined', function(){
    var js = fixture('exists.js');
    var ret = eval(js + 'require("foo/bar")', {});
    ret.baz.should.be.true;
    ret.hey.should.be.false;
  })

  it('should work with ./deps', function(){
    var js = fixture('deps-exists.js');
    var ret = eval(js + 'require("foo")', {});
    ret.doesntExist.should.be.false;
    ret.baz.should.be.true;
  })
})

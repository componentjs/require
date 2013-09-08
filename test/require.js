
/**
 * Module dependencies.
 */

var fs = require('fs')
  , vm = require('vm')
  , r = require('..')
  , read = fs.readFileSync
  , should = require('should');

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
    should.equal(ret.foo, 'foo');
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

  it('should support ./deps when nested', function(){
    var js = fixture('nested-dep-resolution.js');
    var ret = eval(js + 'require("bar")', {});
    ret.should.equal('foo');
  })

  it('should report errors relative to the parent', function(done){
    try {
      var js = fixture('error.js');
      var ret = eval(js + 'require("foo")', {});
    } catch (err) {
      err.message.should.equal('Failed to require "./baz" from "foo/bar"');
      done();
    }
  })

  it('should report dep errors relative to the parent', function(done){
    try {
      var js = fixture('deps-error.js');
      var ret = eval(js + 'require("foo")', {});
    } catch (err) {
      err.message.should.equal('Failed to require "doesnt-exist" from "foo/deps/bar"');
      done();
    }
  })

  it('should not be confused by prototypal inheritance', function() {
    var js = fixture('prototypal-errors.js');
    (function() { eval(js + 'require("constructor")', {}); }).should.throwError();
    var ret = eval(js + 'require("toString")', {});
    ret.stuff.should.equal(228);
  })

  it('should support absolute paths', function() {
    var js = fixture('absolute.js');
    var ret = eval(js + 'require("meh")', {});
    ret.should.equal('hi');
  })
})

describe('require.normalize(curr, path)', function(){
  it('should resolve foo', function(){
    normalize('touch/dispatcher', 'foo')
      .should.equal('foo');
  })

  it('should resolve ./foo', function(){
    normalize('touch/dispatcher', './touch')
      .should.equal('touch/dispatcher/touch');
  })

  it('should resolve ..', function(){
    normalize('touch/dispatcher', '..')
      .should.equal('touch');

    normalize('touch/dispatcher/foo', '../../')
      .should.equal('touch');
  })
})

describe('require.alias(from, to)', function(){
  it('should alias a module definition', function(){
    var js = fixture('alias.js');
    var ret = eval(js + 'require("foo")', {});
    ret.should.equal('bar');
  })

  it('should support "main" for deps', function(){
    var js = fixture('alias-main.js');
    var ret = eval(js + 'require("foo")', {});
    ret.should.equal('bar');
  })

  it('should support "main"', function(){
    var js = fixture('alias-main-boot.js');
    var ret = eval(js + 'require("foo")', {});
    ret.should.equal('foo');
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

describe('CommonJS environment', function(){
  function variableType(name){
    var js = fixture('typeof.js');
    var ret = eval(js + 'require("typeof/' + name + '.js")', {});
    return ret;
  }

  it('exports should be of type object', function(){
    var ret = variableType('exports');
    ret.should.equal('object');
  });

  it('require should be of type function', function(){
    var ret = variableType('require');
    ret.should.equal('function');
  });

  it('module should be of type object', function(){
    var ret = variableType('module');
    ret.should.equal('object');
  });
})

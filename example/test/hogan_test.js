'use strict';

var grunt = require('grunt');

var expectOutput = function(test, target) {
  test.expect(1);

  var actual = grunt.file.read('tmp/' + target + '.js');
  var expected = grunt.file.read('test/expected/' + target + '.js');
  test.equal(actual, expected, 'should have had an expected output for '+target);
  test.done();
};

exports.hogan = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },
  custombinder: function(test) { expectOutput(test, 'custombinder'); },
  glob: function(test) { expectOutput(test, 'glob'); },
  multi: function(test) { expectOutput(test, 'multi'); },
  namefunc: function(test) { expectOutput(test, 'namefunc'); },
  simple: function(test) { expectOutput(test, 'simple'); },
  twocustombinders: function(test) { expectOutput(test, 'twocustombinders'); },
  use_amd: function(test) { expectOutput(test, 'use_amd'); },
  use_custombinder: function(test) { expectOutput(test, 'use_custombinder'); },
  use_revealing: function(test) { expectOutput(test, 'use_revealing'); },
  use_twocustombinders: function(test) { expectOutput(test, 'use_twocustombinders'); }
};


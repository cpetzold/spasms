var assert = require('assert');
    
require('../lib/util');

module.exports = {

  'test String.diff() with two equal strings': function() {
    var diff = 'this is a test string'.diff('this is a test string');
    assert.length(diff, 0);
  },
  
  'test String.diff() with two unequal strings': function() {
    var diff = 'this is a test string'.diff('this is a bad string');
    assert.length(diff, 0);
  },

};
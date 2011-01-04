var mongoose = require('../support/mongoose'),
    document = mongoose.define;

document('Phrase')
  .oid('_id')
  .string('phrase')
  .static('getNext', function(fn){
    var self = this,
        i;
    self.count(function(err, length){
      console.log(length);
      i = Math.floor(Math.random()*length);
      self.find().skip(i).one(fn);
    });
  });
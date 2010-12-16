var util = require('util'),
    Round = require('./round');

function Game(options) {
  options = options || {};
  this.delay = options.delay || 5000;
  
  this.playing = false;
}
util.inherits(Game, EventEmitter);
module.exports = Game;

Game.prototype.play = function() {
  this.playing = true;
  this.emit('start');
  this.next();
}

Game.prototype.stop = function() {
  this.emit('end');
  this.playing = false;
}

Game.prototype.next = function(round) {
  this.round = round || new Round('this is a test round');
  this.emit('newRound', this.round);
  
  var self = this;
  setTimeout(function(){
    console.log('starting');
    console.log(self.round);
    self.round.start();
  }, this.delay);
  
  this.round.on('end', function(o){
    console.log(o);
    if (this.playing) {
      self.next();
    }
  });
  
}

var g = new Game;
g.play();
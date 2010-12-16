var util = require('util'),
    EventEmitter = require('events').EventEmitter,
    Player = require('./player'),
    Round = require('./round');

function Game(options) {
  options = options || {};
  this.delay = options.delay || 5000;
  
  this.playing = false;
  this.active = false;
}
util.inherits(Game, EventEmitter);
module.exports = Game;

Game.prototype.play = function() {
  console.log('game starting in '+ this.delay/1000 +' seconds');
  this.active = true;
  this.emit('start');
  this.next();
}

Game.prototype.stop = function() {
  this.active = false;
  this.emit('end');
}

Game.prototype.submit = function(player, submission) {
  if (this.playing) {
    this.round.submit(player, submission);
  } else {
    this.emit('submitError', { reason: 'Game stopped' });
  }
}

Game.prototype.next = function(round) {
  this.round = round || new Round('this is a test round');
  this.emit('newRound', this.round);
  
  var self = this;
  setTimeout(function(){
    console.log('round starting');
    console.log(self.round);
    self.playing = true;
    self.round.start();
  }, this.delay);
  
  this.round.on('end', function(o){
    console.log(o);
    self.playing = false;
    if (self.active) {
      self.next();
    }
  });
  
  this.round.on('submit', function(o){
    console.log(o);
  });
  
}

var g = new Game;
g.play();

var p = new Player('1');

setInterval(function(){
  g.submit(p, 'This is a tset ruined.');
}, 500);


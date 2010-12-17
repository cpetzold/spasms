var util = require('util'),
    log = require('logging').from(__filename),
    EventEmitter = require('events').EventEmitter,
    Player = require('./player'),
    Round = require('./round');

function Game(id, options) {
  options = options || {};
  this.id = id;
  this.delay = options.delay || 10000;
  
  this.playing = false;
  this.active = false;
  
  log(this.id, 'created', this);
}
util.inherits(Game, EventEmitter);
module.exports = Game;

Game.prototype.start = function() {
  log(this.id, 'starting in', this.delay/1000, 'seconds');
  this.active = true;
  this.emit('start');
  this.next();
  
  return this;
}

Game.prototype.stop = function() {
  this.active = false;
  this.emit('end');
  
  return this;
}

Game.prototype.submit = function(player, submission) {
  if (this.playing) {
    this.round.submit(player, submission);
  } else {
    this.emit('submitError', { reason: 'Game stopped' });
  }
  
  return this;
}

Game.prototype.next = function(round) {
  this.round = round || new Round('this is a test round');
  this.emit('newRound', this.round);
  
  var self = this;
  setTimeout(function(){
    log(this.id, 'round started', self.round);
    self.playing = true;
    self.round.start();
  }, this.delay);
  
  this.round.on('end', function(o){
    log(this.id, 'round ended', o);
    self.playing = false;
    if (self.active) {
      self.next();
    }
  });
  
  this.round.on('submit', function(o){
    log(this.id, 'submission', o);
  });
  
  return this;
}

Game.prototype.getScore = function(submission) {
  var w = 0;
  submission.diff.forEach(function(d){
    w += (d[1] - d[0]) + 1;
  });
  
  var score = this.round.string.length - w;
}

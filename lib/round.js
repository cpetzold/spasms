var util = require('util'),
    EventEmitter = require('events').EventEmitter;

function Round(string, options) {
  EventEmitter.call(this);
  
  options = options || {};
  this.string = string || '';
  this.players = {};
  this.submissions = {};
  this.countdown =  options.countdown || this.string.length * (options.multiplier || 400);
  if(Array.isArray(options.players)) this.addPlayers(options.players);
}
util.inherits(Round, EventEmitter);
module.exports = Round;

Round.prototype.addPlayer = function(player) {
  if(!this.players[player.id]) {
    this.players[player.id] = player;
  }
  return this;
}
  
Round.prototype.addPlayers = function(players) {
  players.forEach(function(player){
    this.addPlayer(player);
  },this);
  return this;
}

Round.prototype.start = function() {
  var self = this;
  this.startTime = +new Date;
  this.timerId = setTimeout(function(){
    self.end();
  }, this.countdown);
  
  this.emit('start', {
    players: this.players,
    time: this.startTime
  });
  
  return this;
}

Round.prototype.submit = function(player, msg) {
  this.addPlayer(player);
  
  if (!this.submissions[player.id]) {
    this.submissions[player.id] = { msg: msg, time: (+new Date) - this.startTime };
    this.emit('submit', this.submissions[player.id]);
    
    if (Object.keys(this.submissions).length === Object.keys(this.players).length) {
      this.end();
    }
  }
  
  return this;
}

Round.prototype.end = function() {
  clearTimeout(this.timerId);
  this.endTime = +new Date;
  this.scores = this.getScores();
  
  this.emit('end', {
    submissions: this.submissions,
    time: this.endTime
  });
  
  return this;
}

Round.prototype.getScores = function() {
  // add logic for score here
  // base it on correctness and time
  // some formula here
  // for every wrong character this.submissions[player].ts += multiplier;
  return {
    'hello': 'world'
  };
}
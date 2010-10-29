var sentences = require('./wonder');

var Game = module.exports = function(socket) {
  this.socket = socket;
  this.players = [];
  this.entries = [];
  this.maxPlayers = 5;
  
  this.socket.on('connection', this.onPlayerConnect);
  this.socket.on('clientMessage', this.onPlayerMessage);
};

Game.prototype = {
  reset: function() {
    console.log('reset');
  },
  
  onPlayerMessage: function(data, player) {
    console.log('msg', data, player);
  },
  
  onPlayerConnect: function(player) {
    console.log('connected');
  },
  
  onSMS: function(number, msg) {
    console.log(number, msg);
  }

};
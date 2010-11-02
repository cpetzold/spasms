var sys = require('sys'),
    sentences = require('./wonder');

var Game = module.exports = function(socket) {
  this.socket = socket;
  this.players = [];
  this.entries = [];
  this.maxPlayers = 5;
  
  this.socket.on('connection', function(client){
  });
  
  var self = this;
  this.socket.on('clientMessage', function(object, client){
    for (var action in object) {
      switch(action) {
        case 'join':
          self.onPlayerJoin(object[action], client);
          break;
      }
    }
  });
};

Game.prototype = {
  reset: function() {
    console.log('reset');
  },
  
  onPlayerJoin: function(data, client) {
    var name = data.name,
        phone = data.phone,
        response = {};
    
    if (this.players.length < this.maxPlayers) {
      if (!this.numberInUse(phone)) {
        this.players.push(new Player(name, phone));
        response.newPlayer = { 'name': name };
      } else {
        response.rejected = { 'reason': 'numberExists' };
      }
    } else {
      response.rejected = { 'reason': 'roomFull' };
    }
        
    client.send(response);
    if (!response.rejected) {
      client.broadcast(response);
    }     
  },
  
  numberInUse: function(number) {
    for (var i = 0; i < this.players.length; i++) {
      if (this.players[i].phone == number) return true;
    }
    return false;
  },

  onSMS: function(number, msg) {
    console.log(number, msg);
  }

};

var Player = function(name, phone) {
  this.name = name;
  this.phone = phone;
};
Player.prototype = {
  
};
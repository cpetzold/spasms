var sys = require('sys'),
    sentences = require('./wonder');

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
  
  onPlayerMessage: function(object, client) {
    console.log(sys.inspect(object));
    for (var action in object) {
      switch(action) {
        case 'join':
          this.onPlayerJoin(object[action], client);
          break;
      }
    }
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
    
    console.log(name, phone, response);
    
    if (response.rejected) {
      client.send(response);
    } else {
      this.socket.broadcast(response);
    }
        
  },
  
  numberInUse: function(number) {
    for (var i = 0; i < this.palyers.length; i++) {
      if (this.players[i].phone == number) return true;
    }
    return false;
  },
  
  onPlayerConnect: function(player) {
    // console.log('connected');
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
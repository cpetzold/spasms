var sys = require('sys'),
    strings = require('./wonder');

var Game = module.exports = function(socket) {
  this.playing = false;
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
  
  this.run();
};
Game.prototype = {
  run: function() {
    var self = this;
    this.time = new Date();
    this.string = this.nextString();
  },
  
  nextString: function() {
    return strings[Math.floor(Math.random()*strings.length)-1];
  },
  
  onPlayerJoin: function(data, client) {
    var name = data.name,
        phone = data.phone,
        response = {};
    
    if (this.players.length < this.maxPlayers) {
      if (!this.getPlayer(phone)) {
        this.players.push(new Player(name, phone));
        response.joinSuccess = { 'name': name, 'phone': phone };
      } else {
        response.joinError = { 'reason': 'numberExists' };
      }
    } else {
      response.joinError = { 'reason': 'roomFull' };
    }
        
    client.send(response);
    
    if ('joinSuccess' in response){
      this.socket.broadcast({
        'newPlayer': { 'name': name }
      });
    }
  },
  
  getPlayer: function(number) {
    for (var i = 0; i < this.players.length; i++) {
      if (this.players[i].phone == number) return this.players[i];
    }
    return false;
  },

  onSMS: function(number, msg) {
    var response = {};
    console.log(number, msg);
    
    if (!this.getPlayer(number)) {
      console.log(number, 'is not a player');
      return;
    }
  }

};

var Player = function(name, phone) {
  this.name = name;
  this.phone = phone;
  this.joined = new Date();
};
Player.prototype = {
  
};
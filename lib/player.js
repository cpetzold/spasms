function Player(id){
  this.id = id;
  this.startTime = +new Date;
  this.rounds = [];
};

module.exports = Player;
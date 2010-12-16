function Player(phone, session_id){
  this.id = phone;
  this.startTime = +new Date;
  this.rounds = [];
};

module.exports = Player;
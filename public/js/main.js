(function($) {
  
var App = function(p) {
  this.socket = new io.Socket(null, {port: p});
  this.game = new Game(this.socket);
  
  this.el = {
    join: $('#join'),
    form: $('#form'),
    name: $('#name'),
    phone: $('#phone'),
    goplay: $('#goplay')
  };
  
  // this.el.form.validate({
  //   debug: console.log,
  //   rules: {
  //     name: {
  //       required: true,
  //       minlength: 3,
  //       maxlength: 20
  //     },
  //     phone: {
  //       required: true,
  //       phoneUS: true
  //     },
  //     submitHandler: this.goPlay,
  //     invalidHandler: function(f, v) {
  //       console.log(f, v);
  //     }
  //   }
  // });
  
  this.el.goplay.click($.proxy(this.play, this));
  
};
App.prototype = {
  play: function(e) {
    e.preventDefault();
    
    var name = this.el.name.val(),
        phone = this.el.phone.val();
    
    this.game.join(name, phone);
  }
 
};

var Game = function(socket) {
  this.socket = socket;
  this.playing = false;
  
  this.el = {
    players: $('#players')
  };
  
 
  this.socket.connect();
  this.socket.on('message', $.proxy(this.onMessage, this));  
};
Game.prototype = {
  onMessage: function(actions) {
    console.info(actions);
    
    $.each(actions, $.proxy(function(action, data){
      switch(action) {
        case 'joinSuccess':
          console.log('Welcome', data.name, data.phone);
          
          break;
        case 'joinError':
          console.log('Join error:', data.reason);
          
          break;
        case 'newPlayer':
          console.log('New player:', data.name);
          this.addPlayer(data.name);
          break;
        

      }
    }, this));
  },
  
  addPlayer: function(name) {
    console.log('adding player', name);
    var el = $('<li></li>').text(name);
    this.el.players.append(el);
  },
  
  join: function(name, phone) {
    this.socket.send({ 'join': {
      'name': name,
      'phone': phone
    }});
  }
};


var app = new App(80);

})(jQuery);


// var id = null;
// 
// 
// function resetGame(){
//   clearInterval(id);
//   var x = 0;
//   id = setInterval(function(){
//     x  +=  100;
//     $('#time').text((!(x % 1000)) ? x/1000 + '.0' : x/1000);
//   }, 100);
//   
//   $('#word').html(wordlist[Math.floor(Math.random(wordlist.length) * wordlist.length)]);
//   
//  // $('#scores ul').html('');
//   var scores = $('#scores ul');
//   scores.html('');
//   var results = [
//     ['Redleader', 400],
//     ['anonymous56', 300, 'Incorrect!'],
//     ['bigdaddy', 250],
//     ['Redleader', 200]
//   ];
//   
//   
//   setTimeout(function(){
//     for(var i=0, l=results.length; i<l; i++){
//       var item = results[i];
//       scores.append(
//         ( (item[2] == undefined) ? '<li>' : '<li class="wrong">') +
//         '<div class="place">'+(i+1)+'</div>' +
//         '<div class="name">'+ item[0]  + '</div>' +
//         '<div class="score">'+ item[1]  + '</div>' +
//         '<div class="message">'+ (item[2] || '') + '</div>' + 
//       '</li>');
//     }
//   }, 1000);
//   
// }
// 
// 
// $(document).ready(function()
//    {
//      
//      $('.close').click(function(){
//        $('#signin-form').hide();
//        $('#signup-form').hide();
//      });
//      
//      $('#signup').click(function(){
//        $('#signin-form').hide();
//        $('#signup-form').toggle();
//      });
//      
//      $('#signin').click(function(){
//        $('#signup-form').hide();
//        $('#signin-form').toggle();
//      });
//      
//      
//      resetGame();
//      
//      
// });
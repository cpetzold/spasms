(function($) {
  
var App = function() {
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
  
  this.el.goplay.click($.proxy(this.goPlay, this));
  
};
App.prototype = {
  goPlay: function(e) {
    e.preventDefault();
    
    var name = this.el.name.val(),
        phone = this.el.phone.val();
    
    this.game = new Game(80);
    this.game.tryJoin(name, phone);
  }
 
};

var app = new App();

var Game = function(p) {
  this.socket = new io.Socket(null, {port: p});
  this.socket.connect();
  this.socket.on('message', this.onMessage);  
};
Game.prototype = {
  onMessage: function(obj) {
    console.log(obj);
  },
  
  tryJoin: function(name, phone) {
    this.socket.send({ 'join': {
      'username': name,
      'phone': phone
    }});
  }
};

})(jQuery);


// var id = null;
// 
// wordlist = [
//   "How funny it'll seem to come out among the people that walk with their heads downward!",
//   "There was nothing else to do, so Alice soon began talking again",
//   "Alice was beginning to get very tired of sitting by her sister on the bank, and of having nothing to do",   
//   "There was nothing so VERY remarkable in that",   
//   "nor did Alice think it so VERY much out of the way to hear the Rabbit say to itself",   
//   "First, she tried to look down and make out what she was coming to, but it was too dark to see anything",   
//   "I wonder if I shall fall right THROUGH the earth",   
//   "she was rather glad there WAS no one listening, this time, as it didn't sound at all the right word",   
//   "but I shall have to ask them what the name of the country is, you know",   
//   "and she tried to curtsey as she spoke--fancy CURTSEYING as you're falling through the air",   
//   "Do you think you could manage it?",   
//   "And what an ignorant little girl she'll think me for asking",   
//   "No, it'll never do to ask:  perhaps I shall see it written up somewhere",   
//   "There was nothing else to do, so Alice soon began talking again",   
//   "I hope they'll remember her saucer of milk at tea-time",   
//   "I wish you were down here with me!",   
//   "There are no mice in the air, I'm afraid, but you might catch a bat, and that's very like a mouse, you know",   
//   "But do cats eat bats, I wonder?",   
//   "And here Alice began to get rather sleepy, and went on saying to herself, in a dreamy sort of way",   
//   "Do cats eat bats?  Do cats eat bats?",   
//   "for, you see, as she couldn't answer either question, it didn't much matter which way she put it",   
//   "She felt that she was dozing off, and had just begun to dream that she was walking hand in hand with Dinah",   
//   "Now, Dinah, tell me the truth:  did you ever eat a bat?",   
//   "when suddenly, thump! thump! down she came upon a heap of sticks and dry leaves, and the fall was over.",   
//   "Alice was not a bit hurt, and she jumped up on to her feet in a moment:  she looked up, but it was all dark overhead",   
//   "before her was another long passage, and the White Rabbit was still in sight, hurrying down it"
// ];
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
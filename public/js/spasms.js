(function($) {
  
function Spasms(p) {
  this.socket = new io.Socket(null, {port: p});
  this.socket.connect();
  
  this.el = {
    output: $('#output'),
    input: $('#input'),
    scroll: $('#scroll')
  };
  
  var self = this;
  this.socket.on('message', function(actions){
    $.each(actions, function(action, o){
      console.log(action, o);
      self[action](o);
    });
  }); 
  
  
  this.el.input.focus();
}

Spasms.prototype = {
  roundStart: function(o) {
    // var msg = $('<p>').html(o.string);
    // this.el.scroll.append(msg);
    
  },
  roundEnd: function(o) {
    
  }
  
  
};

var app = new Spasms(80);

})(jQuery);
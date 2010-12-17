(function($) {
  
function Spasms(p) {
  this.socket = new io.Socket('localhost', {port: p});
  this.socket.connect();
  
  this.el = {
    join: $('#join'),
    form: $('#form'),
    name: $('#name'),
    phone: $('#phone'),
    goplay: $('#goplay')
  };
  
  this.socket.on('message', function(actions){
    $.each(actions, function(action, o){
      console.log(action, o);
    });
  });
  
}

var app = new Spasms(80);

})(jQuery);
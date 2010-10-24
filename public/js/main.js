var message = function(txt){
  console.log(txt);
}


var socket = new io.Socket(null, {port: 80});
socket.connect();
socket.on('message', function(obj){

  console.log(obj);
});

socket.send('some data');

$(document).ready(function()
   {
     $('#signup').click(function(){
       $('#signup-form').toggle();
     });
});

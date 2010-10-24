var message = function(txt){
  console.log(txt);
}


var socket = new io.Socket(null, {port: 80});
socket.connect();
socket.on('message', function(obj){
  if ('buffer' in obj){
    for (var i in obj.buffer) message(obj.buffer[i]);
  } else message(obj);
});
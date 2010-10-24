var message = function(txt){
  console.log(txt);
}


var socket = new io.Socket(null, {port: 80});
socket.connect();
socket.on('message', function(obj){
  for(i in obj) console.log(obj[i]);
});
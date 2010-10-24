var express = require('express'),
    connect = require('connect'),
    sys = require('sys');

var app = module.exports = express.createServer();

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.use(connect.bodyDecoder());
  app.use(connect.methodOverride());
  app.use(connect.compiler({ src: __dirname + '/public', enable: ['less'] }));
  app.use(app.router);
  app.use(connect.staticProvider(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(connect.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(connect.errorHandler()); 
});

app.get('/', function(req, res){
  res.render('index.jade', {
    locals: {
      title: 'sms-game'
    }
  });
});

app.get('/sms', function(req, res){
  console.log(sys.inspect(req));
});


var port = 80;
console.log("Game on! (port: " + port + ")");
if (!module.parent) app.listen(port);

var io = require('socket.io').listen(app);
var buffer = []; 

io.on('connection', function(client){
  client.send({ buffer: buffer });
  client.broadcast({ announcement: client.sessionId + ' connected' });
  
  client.on('message', function(message){
    var msg = { message: [client.sessionId, message ]};
    buffer.push(msg);
    if(buffer.length > 15) buffer.shift();
    clent.broadcast(msg);
  });
  
  client.on('disconnect', function(){
    client.broadcast({ announcement: client.sessionId + ' disconnected' });
  })
  
});

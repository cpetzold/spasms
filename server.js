var express = require('express'),
    connect = require('connect'),
    io = require(__dirname + '/support/socket.io/'),
    sys = require('sys');

var port = 80;
var start = new Date();
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
  
  var from =req.query.From;
  var msg = req.query.Body;
  
  
  if (!players[from]) {
    players[from] = { room: 1, number: from };
    console.log(from, 'added to room', players[from].room);
  }
  
  res.writeHead(200, {'Content-Type': 'text/plain'});
  
  if (!entries[from]) { // If this player hasn't sent an entry yet
    entries[from] = {
      'from' : from,
      'msg' : msg,
      'ts' : (new Date()) - start
    };
    io.broadcast(entries[from]);
    res.end('Thanks for saying "' + msg + '" ' + from + '!\n');
  } else {
    res.end('Go away! :(');
  }
  

});

app.get('/about', function(req, res){
    res.render('about.jade', {
      locals: {
        title: 'About' 
      }
    });
})


if (!module.parent) {
  app.listen(port);
  console.log("Game on! (port: " + port + ")");
}
var io = io.listen(app);
var players = {};
var entries = {};

io.on('connection', function(client){
  client.broadcast({ announcement: client.sessionId + ' connected' });
});

io.on('message', function(o){
  console.log('woah', o);
});

var express = require('express'),
    connect = require('connect'),
    Game = require('./lib/game'),
    io = require(__dirname + '/support/socket.io/'),
    sys = require('sys');

var port = 80;
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


if (!module.parent) {
  app.listen(port);
  console.log("Game on! (port: " + port + ")");
}

var io = io.listen(app);
var game = new Game(io);


app.get('/', function(req, res){
  res.render('room.jade', {
    layout: false
  });
});

app.get('/sms', function(req, res){
  var from = req.query.From;
  var msg = req.query.Body;
  
  game.onSMS(from, msg);
  
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hi ' + from);
});

app.get('/about', function(req, res){
    res.render('about.jade', {
      locals: {
        title: 'About' 
      }
    });
});
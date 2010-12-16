var sys = require('sys'),
    express = require('express'),
    io = require('socket.io'),
    Game = require('./lib/game');

var port = 80;
var app = module.exports = express.createServer();

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.use(express.bodyDecoder());
  app.use(express.methodOverride());
  app.use(express.compiler({ src: __dirname + '/public', enable: ['less'] }));
  app.use(app.router);
  app.use(express.staticProvider(__dirname + '/public'));
}).configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
}).configure('production', function(){
  app.use(express.errorHandler()); 
});

if (!module.parent) app.listen(port);

var io = io.listen(app);
var game = new Game;
game.play();

app.get('/', function(req, res){
  res.render('room.jade', {
    layout: false
  });
});

app.post('/sms', function(req, res){
  var from = req.body.From;
  var msg = req.body.Body;
  game.submit(from, msg);
  
  res.send(200);
});
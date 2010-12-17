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
var games = {};

app.get('/:room', function(req, res){
  var room = req.param('room'),
      game = games[room] || games.push(new Game(room));
      
  if (!game.active) game.start();
  
  res.render('room.jade', {
    locals: {
      game: game
    },
    layout: false
  });
});

app.post('/sms', function(req, res){
  var from = req.param('From');
  var msg = req.param('Body');
  games[Object.keys(games)[0]].submit(from, msg);
  
  res.send(200);
});
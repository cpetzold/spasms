var sys = require('sys'),
    express = require('express'),
    io = require('socket.io'),
    Game = require('./lib/game');

var port = 8080;
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

var io = io.listen(app),
    games = {};

function addGame(room) {
  games[room] = new Game(room);

  games[room].on('roundStart', function(o){
    io.broadcast({'roundStart': o});
  });

  games[room].on('roundEnd', function(o){
    io.broadcast({'roundEnd': o});
  });

  games[room].on('submit', function(o){
    io.broadcast({'submit': o});
  });

  return games[room];
}

function makeRoom(req, res) {
  var room = req.param('room') || '/',
      game = games[room] || addGame(room);

  if (!game.active) game.start();

  res.render('room.jade', {
    locals: {
      game: game
    },
    layout: false
  });
}

app.get('/', makeRoom);
app.get('/:room', makeRoom);
app.post('/sms', function(req, res){
  var from = req.param('From');
  var msg = req.param('Body');
  games[Object.keys(games)[0]].submit(from, msg);

  res.send(200);
});


if (!module.parent) app.listen(port);
var sys = require('sys'),
    express = require('express'),
    connect = require('connect'),
    io = require('socket.io'),
    Game = require('./lib/game');

var port = 80;
var app = module.exports = express.createServer();

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.use(connect.bodyDecoder());
  app.use(connect.methodOverride());
  app.use(connect.compiler({ src: __dirname + '/public', enable: ['less'] }));
  app.use(app.router);
  app.use(connect.staticProvider(__dirname + '/public'));
}).configure('development', function(){
  app.use(connect.errorHandler({ dumpExceptions: true, showStack: true })); 
}).configure('production', function(){
  app.use(connect.errorHandler()); 
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

app.get('/sms', function(req, res){
  var from = req.query.From;
  var msg = req.query.Body;
  
  game.submit(from, msg);
  
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hi ' + from);
});
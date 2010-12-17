var assert = require('assert'),
    Player = require('../lib/player'),
    Round = require('../lib/round');

module.exports = {

  'init: default options': function() {
    var r = new Round('test');
    
    assert.eql(r.string, 'test');
    assert.eql(r.countdown, 1600);
    assert.eql(r.players, {});
    assert.eql(r.submissions, {});
  },
  
  'init: defined timing options': function() {
    var r = new Round('test', {
      countdown: 2000
    });
    assert.eql(r.countdown, 2000);
    
    var r2 = new Round('test', {
      multiplier: 150
    });
    assert.eql(r2.countdown, 600);
  },
  
  'init: defining players': function() {
    var r = new Round('test', {
      players: [
        new Player('1234567890'),
        new Player('0000000000'),
        new Player('2930294931')
      ]
    });

    assert.eql(r.players['1234567890'].id, '1234567890');
    assert.eql(r.players['0000000000'].id, '0000000000');
    assert.eql(r.players['2930294931'].id, '2930294931');
  },
  
  'adding individual players and duplicates': function() {
    var r = new Round('test');
    
    r.addPlayer(new Player('1234567890'));
    
    assert.eql(r.players['1234567890'].id, '1234567890');
    assert.length(Object.keys(r.players), 1);
    
    r.addPlayer(new Player('1234567890'));

    assert.length(Object.keys(r.players), 1); 
  },
  
  'adding an array of players': function() {
    var r = new Round('test');
    
    r.addPlayers([
      new Player('1234567890'),
      new Player('0000000000'),
      new Player('2930294931')
    ]);
    
    assert.length(Object.keys(r.players), 3);
    assert.eql(r.players['1234567890'].id, '1234567890');
    assert.eql(r.players['0000000000'].id, '0000000000');
    assert.eql(r.players['2930294931'].id, '2930294931');
    
    var r2 = new Round('test');
    
    r2.addPlayers([
      new Player('0000000000'),
      new Player('0000000000'),
      new Player('0000000000')
    ]);
    
    assert.length(Object.keys(r2.players), 1);
  }, 

  'event: starting without players': function() {
    var r = new Round('test');
        
    r.on('start', function(o){
      assert.eql(o.players, {});
      assert.type(o.time, 'number');
    });
    
    r.start();
  },
  
  'event: starting with players': function() {
    var r = new Round('test');
    
    r.addPlayer(new Player('1111111111'));
    r.addPlayer(new Player('2222222222'));

    r.on('start', function(o){
      assert.eql(o.players['1111111111'].id, '1111111111');
      assert.eql(o.players['2222222222'].id, '2222222222');
    });

    r.start();
  }

};
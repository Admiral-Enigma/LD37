var game = new Phaser.Game(640, 480, Phaser.CANVAS, 'phaser-example');
game.globals = {
  score: 0
};


game.state.add('load', load);

game.state.add('play', play);
game.state.start('load');

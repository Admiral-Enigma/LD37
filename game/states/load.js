var load = {
  preload: function () {
    //IMG
    game.load.image('platform', 'game/assets/testPlatform.png');
    game.load.image('box', 'game/assets/box.png');
    game.load.image('player','game/assets/testPlayer.png');


    //AUDIO
    game.load.audio('jump','game/assets/Jump.wav');
    game.load.audio('spawn','game/assets/spawn.wav');



  },
  create: function () {
    game.state.start('play');
  }
};

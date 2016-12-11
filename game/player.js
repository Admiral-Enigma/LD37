var player = {
  playerSprite: null,
  playerCol: null,
  gKey: null,
  jumpTimer: 0,
  spawnKeyPressed: false,
  playerMaterial: null,
  jumpSound: null,
  spawnSound: null,
  create: function (x, y) {
    this.playerCol =  game.physics.p2.createCollisionGroup();
    game.physics.p2.updateBoundsCollisionGroup();

    this.playerSprite = game.add.sprite(x,y,'player');
    game.physics.p2.enable(this.playerSprite);
    this.playerSprite.enableBody = true;
    this.playerSprite.physicsBodyType = Phaser.Physics.P2JS;
    this.playerSprite.body.setCollisionGroup(this.playerCol);
    this.playerSprite.body.fixedRotation = true;
    this.playerSprite.body.collides([play.platformColGroup, maelkekasse.kasseColGroup]);
    this.playerMaterial = game.physics.p2.createMaterial('playerMaterial', this.playerSprite.body);

    this.gKey = game.input.keyboard.addKey(Phaser.Keyboard.G);

    this.jumpSound = game.add.audio('jump');
    this.spawnSound = game.add.audio('spawn');


  },
  canJump: function(){
    // Create a vector
    var yax = p2.vec2.fromValues(0,1);
    var res = false;

    for (var i = 0; i < game.physics.p2.world.narrowphase.contactEquations.length; i++) {
      var tempC = game.physics.p2.world.narrowphase.contactEquations[i];
      if (tempC.bodyA === this.playerSprite.body.data || tempC.bodyB === this.playerSprite.body.data) {
        var d = p2.vec2.dot(tempC.normalA, yax);
        if(tempC.bodyA === this.playerSprite.body.data) d *= -1;
        if(d > 0.5) res = true;

      }
    }
    return res;
  },
  update: function () {
    //this.playerSprite.body.setZeroVelocity();
    this.playerSprite.body.velocity.x = 0;

    if (play.cursors.right.isDown) {
      this.playerSprite.body.moveRight(200);
    }else if (play.cursors.left.isDown) {
      this.playerSprite.body.moveLeft(200);
    }
    if (play.cursors.up.isDown && game.time.now > this.jumpTimer && this.canJump()) {
      this.playerSprite.body.moveUp(370);
      this.jumpTimer = game.time.now + 750;
      this.jumpSound.play();
    }
    //DEBUG
    if(this.gKey.isDown){
      //maelkekasse.createKasse(game.input.mousePointer.x, game.input.activePointer.position.y + game.camera.y );
      //console.log(game.input.mousePointer.x+' '+game.input.activePointer.position.y + game.camera.y);
      this.spawnKeyPressed = true;
    }
    if(this.gKey.isUp && this.spawnKeyPressed == true){
      maelkekasse.createKasse(game.input.mousePointer.x, game.input.activePointer.position.y + game.camera.y );
      //console.log(game.input.mousePointer.x+' '+game.input.activePointer.position.y + game.camera.y);
      this.spawnSound.play();
      this.spawnKeyPressed = false;
    }
  }
}

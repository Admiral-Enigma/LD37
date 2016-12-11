var play = {
  basePlatform: null,
  box: null,
  platformColGroup: null,
  cursors: null,
  mouseBody: null,
  constraint: null,


  create: function (){
    //physics
    game.stage.backgroundColor = '#3498db';//'#2980b9';//'#2c3e50';

    game.physics.startSystem(Phaser.Physics.P2JS);
    game.physics.p2.gravity.y = 600;
    //game.physics.p2.restitution = 0.9;

    game.physics.p2.setImpactEvents(true);
    this.platformColGroup =  game.physics.p2.createCollisionGroup();
    game.physics.p2.updateBoundsCollisionGroup();

    this.cursors = game.input.keyboard.createCursorKeys();
    maelkekasse.create();
    player.create(70,9790);

    //Base platform
    var baseMaterial = game.physics.p2.createMaterial('baseMaterial');

    this.basePlatform = game.add.sprite(320, 9950, 'platform');
    game.physics.p2.enable(this.basePlatform);
    this.basePlatform.body.static = true;
    this.basePlatform.body.setCollisionGroup(this.platformColGroup);
    this.basePlatform.body.collides([maelkekasse.kasseColGroup, player.playerCol]);
    this.basePlatform.body.setMaterial(baseMaterial);
    // YES PHYSICS IS WORKING BIACES

    /**maelkekasse.createKasse(50,20);
    maelkekasse.createKasse(100,20);**/
    game.world.setBounds(0, 0, 640, 10000);

    game.camera.follow(player.playerSprite);

    game.camera.deadzone = new Phaser.Rectangle(50,350,540, 60);

    this.mouseBody = new p2.Body();
    game.physics.p2.world.addBody(this.mouseBody);

    var basePlayer = game.physics.p2.createContactMaterial(player.playerMaterial, baseMaterial, {friction: 0.0});
    var baseKasse = game.physics.p2.createContactMaterial(maelkekasse.kasseMaterial, baseMaterial, {friction: 1.0});
    var kasseKasse = game.physics.p2.createContactMaterial(maelkekasse.kasseMaterial,maelkekasse.kasseMaterial,{friction: 1.0});

  },


  update: function() {
    maelkekasse.update();
    player.update();
    //console.log(game.input.mousePointer.x+' '+game.input.mousePointer.y);

  },

   render: function () {
     /**var zone = game.camera.deadzone;

     game.context.fillStyle = 'rgba(255,0,0,0.6)';
     game.context.fillRect(zone.x, zone.y, zone.width, zone.height);**/

     //game.debug.spriteCoords(player.playerSprite, 32, 32);


   }
};

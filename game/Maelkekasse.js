var maelkekasse = {
  kasseGroup: null,
  kasseColGroup: null,
  kasseMaterial: null,
  create: function(){
    this.kasseGroup = game.add.group();
    this.kasseGroup.enableBody = true;
    this.kasseGroup.physicsBodyType = Phaser.Physics.P2JS;

    this.kasseColGroup = game.physics.p2.createCollisionGroup();
    game.physics.p2.updateBoundsCollisionGroup();

    this.kasseMaterial = game.physics.p2.createMaterial('kasseMaterial');


  },
  createKasse: function (x, y) {
    var kasse = this.kasseGroup.create(x,y,'box');
    game.physics.p2.enable(kasse);

    kasse.body.setCollisionGroup(this.kasseColGroup);
    kasse.body.collides([this.kasseColGroup,play.platformColGroup,player.playerCol]);
    kasse.body.collideWorldBounds = false;
    kasse.body.setMaterial(this.kasseMaterial);

  },

  getBodys: function () {
    var res = [];
    this.kasseGroup.forEachAlive(function (member) {
      res.push(member.body);
    }, this);

    return res;
  },

  update:function () {

  }

};

import 'phaser';

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    physics: {
        default: 'matter',
        matter: {
            debug: false,
        }
    },
    scene: {
        preload: preload,
        // create: demo,
        create: platforms,
        update: update
    }
};

var game = new Phaser.Game(config);
var player;
var playerhead;
var cursors;

function preload () {
    this.load.image('logo', 'assets/logo.png');
    this.load.image('red-particle', 'assets/particles/red.png');
    this.load.image('flame-particle', 'assets/particles/flame1.png');

    this.load.image('cat-body', 'assets/kittenbody.png');
    this.load.image('cat-head', 'assets/kittenHead.png');

    this.load.image('sky', 'assets/sky.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('crate', 'assets/crate.jpg');
}

function platforms() {
    this.matter.world.setBounds(0, -200, game.config.width, game.config.height + 200);

    // Background image
    this.add.image(400, 300, 'sky');

    // Static obstacles
    this.matter.add.image(200, 580, 'ground', null, { restitution: 0.6, isStatic: true });
    this.matter.add.image(600, 580, 'ground', null, { restitution: 0.6, isStatic: true });

    this.matter.add.image(600, 400, 'ground', null, { restitution: 0.6, isStatic: true });
    this.matter.add.image(50, 250, 'ground', null, { restitution: 0.6, isStatic: true });
    this.matter.add.image(750, 220, 'ground', null, { restitution: 0.6, isStatic: true });


    player = this.physics.add.sprite(100, 450, 'cat-body');
    playerhead = this.add.sprite(100, 450, 'cat-head')
    playerhead.gravity = 0;


    // Moving obstacles
    for (let i=0; i< 10; i++) {
        this.matter.add.sprite(Phaser.Math.Between(20, 700), 16, 'crate');
    }

}

function update(){

    if (cursors.left.isDown)
    {
        player.setVelocityX(-160);


        //player.anims.play('left', true);
    }
    else if (cursors.right.isDown)
    {
        player.setVelocityX(160);

       // player.anims.play('right', true);
    }
    else
    {
        player.setVelocityX(0);

       // player.anims.play('turn');
    }

    if (cursors.up.isDown && player.body.touching.down)
    {
        player.setVelocityY(-330);
    }


    console.log(player.y)

playerhead.y = player.y;
    console.log(playerhead.y)
    //playerhead.setPosition(player.x + 10, player.y +10)

}

   


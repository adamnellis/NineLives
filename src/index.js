import 'phaser';

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
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
var cursors;

function preload () {
    this.load.image('logo', 'assets/logo.png');
    this.load.image('red-particle', 'assets/particles/red.png');
    this.load.image('flame-particle', 'assets/particles/flame1.png');

    this.load.image('cat-body', 'assets/cat/body.png');

    this.load.image('sky', 'assets/sky.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('crate', 'assets/crate.jpg');
}

function platforms() {
    // Background image
    this.add.image(400, 300, 'sky');

    // Static obstacles
    const platforms = this.physics.add.staticGroup();

    platforms.create(400, 568, 'ground').setScale(2).refreshBody();

    platforms.create(600, 400, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(750, 220, 'ground');


    player = this.physics.add.sprite(100, 450, 'cat-body');

    cursors = this.input.keyboard.createCursorKeys();

    this.physics.add.collider(player, platforms);

     // Moving obstacles
    const crates = this.physics.add.group();

    this.physics.add.collider(crates, platforms);
    this.physics.add.collider(crates, crates);

    for (let i=0; i< 20; i++) {
        const crate = crates.create(Phaser.Math.Between(20, 700), 16, 'crate');
        crate.setBounce(0.6);
        crate.setDrag(0.7);
        crate.setCollideWorldBounds(true);
        crate.setVelocity(Phaser.Math.Between(-200, 200), 20);
        crate.allowGravity = false;
    }

}

function update(){
    debugger;

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


}

   
}


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
    }
};

var game = new Phaser.Game(config);

function preload () {
    this.load.image('logo', 'assets/logo.png');
    this.load.image('red-particle', 'assets/particles/red.png');
    this.load.image('flame-particle', 'assets/particles/flame1.png');

    this.load.image('sky', 'assets/sky.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('crate', 'assets/crate.jpg');
}

function demo () {
    const logo = this.add.image(400, 150, 'logo');

    this.tweens.add({
        targets: logo,
        y: 450,
        duration: 2000,
        ease: 'Power2',
        yoyo: true,
        loop: -1
    });

    const particles = this.add.particles('red-particle');

    const emitter = particles.createEmitter({
        speed: 100,
        scale: { start: 1, end: 0 },
        blendMode: 'ADD'
    });

    emitter.startFollow(logo);

    const particles_fire = this.add.particles('flame-particle');
    const emitter_fire = particles_fire.createEmitter({
        speed: 100,
        frequency: 1,
        maxVelocityX: 10,
        scale: { start: 1, end: 0 },
        blendMode: 'ADD',
        x: {min: 700, max: 750},
        y: 500,
    });

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

    // Moving obstacles
    for (let i=0; i< 10; i++) {
        this.matter.add.sprite(Phaser.Math.Between(20, 700), 16, 'crate');
    }
}

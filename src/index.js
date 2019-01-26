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
    }
};

var game = new Phaser.Game(config);

function preload () {
    this.load.image('logo', 'assets/logo.png');
    this.load.image('red-particle', 'assets/particles/red.png');
    this.load.image('flame-particle', 'assets/particles/flame1.png');

    this.load.image('sky', 'assets/sky.png');
    this.load.image('ground', 'assets/platform.png');
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
    this.add.image(400, 300, 'sky');

    const platforms = this.physics.add.staticGroup();

    platforms.create(400, 568, 'ground').setScale(2).refreshBody();

    platforms.create(600, 400, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(750, 220, 'ground');
}
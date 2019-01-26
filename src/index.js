import 'phaser';

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create
    }
};

var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('logo', 'assets/logo.png');
    this.load.image('red-particle', 'assets/particles/red.png');
    this.load.image('flame-particle', 'assets/particles/flame1.png');
}

function create ()
{
    var logo = this.add.image(400, 150, 'logo');

    this.tweens.add({
        targets: logo,
        y: 450,
        duration: 2000,
        ease: 'Power2',
        yoyo: true,
        loop: -1
    });

    var particles = this.add.particles('red-particle');

    var emitter = particles.createEmitter({
        speed: 100,
        scale: { start: 1, end: 0 },
        blendMode: 'ADD'
    });

    emitter.startFollow(logo);

    var particles_fire = this.add.particles('flame-particle');
    var emitter_fire = particles_fire.createEmitter({
        speed: 100,
        frequency: 1,
        maxVelocityX: 10,
        scale: { start: 1, end: 0 },
        blendMode: 'ADD',
        x: {min: 700, max: 750},
        y: 500,
    });

}

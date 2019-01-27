import constants from './constants.js';

export default class Car {
    constructor(scene, x, y) {

        this.scene = scene;

        this.sprite = scene.matter.add.sprite(x, y, "car");
        this.sprite.setBody({
            type: 'rectangle',
            width: 550,
            height: 128
        });

        this.sprite.setFlipX(true);

        this.sprite.setCollidesWith([ 1,2 ]);

        this.sprite.setFixedRotation()
        this.scene.events.on("update", this.update, this);

        this.sprite.custom_object = this;

        this.scene.anims.create({
            key: 'left',
            frames: this.scene.anims.generateFrameNumbers('car', { start: 0, end: 2 }),
            frameRate: 10,
            repeat: 1
        });
        this.run_animation = true;


    }

    update() {
        if (this.run_animation) {
            this.sprite.anims.play('left', true);

            this.sprite.setVelocityX(-constants.carVelocity);

        }

    }

    stop_animation() {
        this.run_animation = false;
    }
}
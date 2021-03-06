import constants from './constants.js';

export default class Car {
    constructor(scene, x, y) {

        this.scene = scene;

        this.velocity = - constants.carVelocity;
        this.leftDirection = true;

        this.sprite = scene.matter.add.sprite(x, y, "car");
        this.sprite.setBody({
            type: 'rectangle',
            width: 550,
            height: 128
        });

        this.sprite.setFlipX(true);

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


        try {
            if (this.run_animation) {
                this.sprite.anims.play('left', true);
                this.sprite.setVelocityX(this.velocity);
            }
        }catch (e) {

        }






    }

    flipCar(left){

        if(this.leftDirection && left){
            this.leftDirection = false;
            this.sprite.setFlipX(false);
            this.velocity = - this.velocity;
        } else if(this.leftDirection == false && left == false){
            this.leftDirection = true;
            this.sprite.setFlipX(true);
            this.velocity = - this.velocity;
        }
    }

    stop_animation() {
        this.run_animation = false;
    }

    stop(){
        this.velocity = 0;
        this.stop_animation();
    }

}
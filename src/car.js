export default class Car {
    constructor(scene, x, y) {

        this.scene = scene;

        this.sprite = scene.matter.add.sprite(x, y, "car");

        this.sprite.setFixedRotation()
        this.scene.events.on("update", this.update, this);


        // this.scene.anims.create({
        //     key: 'left',
        //     frames: this.scene.anims.generateFrameNumbers('car', { start: 0, end: 2 }),
        //     frameRate: 10,
        //     repeat: 1
        // });


    }

    update() {

     //   this.sprite.anims.play('left', true);
        this.sprite.setVelocityX(25);
    }


}
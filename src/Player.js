import Phaser from "phaser";
import MultiKey from "./multi-key.js";

export default class Player {
    constructor(scene, x, y) {
        this.scene = scene;

        // Create the animations we need from the player spritesheet
        const anims = scene.anims;
        // anims.create({
        //     key: "player-idle",
        //     frames: anims.generateFrameNumbers("player", {start: 0, end: 3}),
        //     frameRate: 3,
        //     repeat: -1
        // });
        // anims.create({
        //     key: "player-run",
        //     frames: anims.generateFrameNumbers("player", {start: 8, end: 15}),
        //     frameRate: 12,
        //     repeat: -1
        // });

        // Create the physics-based sprite that we will move around and animate
        this.sprite = scene.matter.add.sprite(100, 100, "player");


        this.sprite.setFixedRotation()
        this.scene.events.on("update", this.update, this);
    }

    update() {


        var cursors = this.scene.cursors;

        if (cursors.left.isDown)
        {
            this.sprite.setVelocityX(-10);
        }
        else if (cursors.right.isDown)
        {
            this.sprite.setVelocityX(10);
        }
        else
        {
            this.sprite.setVelocityX(0);
        }

        if (cursors.up.isDown)
        {
            this.sprite.setVelocityY(-10);
        }
        else if (cursors.down.isDown)
        {
            this.sprite.setVelocityY(10);
        }



    }


}

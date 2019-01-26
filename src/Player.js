import Phaser from "phaser";
import MultiKey from "./multi-key.js";

export default class Player {
    constructor(scene, x, y) {
        this.scene = scene;

        this.iterations_zero_velocity = 0;
        this.up_pressed_last_frame = false;

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
        this.sprite = scene.matter.add.sprite(x, y, "player");


        this.sprite.setFixedRotation()
        this.scene.events.on("update", this.update, this);
    }

    update() {
        var cursors = this.scene.cursors;

        // Check if we are allowed to jump
        if (Math.abs(this.sprite.body.velocity.y) < 1e-6) {
            this.iterations_zero_velocity += 1;
        }
        else {
            this.iterations_zero_velocity = 0;
        }
        var jump = false;
        if (this.up_pressed_last_frame === false && cursors.up.isDown && this.iterations_zero_velocity > 0) {
            jump = true;
        }
        this.up_pressed_last_frame = cursors.up.isDown;


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

        if (jump)
        {
            this.sprite.setVelocityY(-15);
        }
    }


}

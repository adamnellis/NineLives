import Phaser from "phaser";
import MultiKey from "./multi-key.js";

export default class Player {
    constructor(scene, x, y, sheet) {
        this.scene = scene;

        // Create the animations we need from the player spritesheet
        const anims = scene.anims;

        this.iterations_zero_velocity = 0;
        this.up_pressed_last_frame = false;

        // Create the physics-based sprite that we will move around and animate
        this.sprite = scene.matter.add.sprite(x, y, sheet);

        this.sprite.custom_object = this;

        this.sprite.setFixedRotation()
        this.scene.events.on("update", this.update, this);

        this.cursors = this.createCursorKeys(this.scene.input.keyboard);
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
        if (this.up_pressed_last_frame === false && this.cursors.up.isDown && this.iterations_zero_velocity > 0) {
            jump = true;
        }
        this.up_pressed_last_frame = this.cursors.up.isDown;



        if (this.cursors.left.isDown)
        {
            this.sprite.setVelocityX(-10);
        }
        else if (this.cursors.right.isDown)
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

    createCursorKeys (keyboard){  }


}

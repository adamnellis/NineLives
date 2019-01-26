import Phaser from "phaser";
import MultiKey from "./multi-key.js";

export default class Player {
    constructor(scene, x, y, sheet) {
        this.scene = scene;

        this.iterations_zero_velocity = 0;
        this.up_pressed_last_frame = false;

        // Create the physics-based sprite that we will move around and animate
        this.sprite = scene.physics.add.sprite(x, y, sheet);
        this.sprite.setCollideWorldBounds(true);
        this.sprite.custom_object = this;

       // this.sprite.setFixedRotation()
        this.scene.events.on("update", this.update, this);

        this.cursors = this.createCursorKeys(this.scene.input.keyboard);

        this.allowMoveLeft = true;
        this.allowMoveRight = true;

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



        if (this.cursors.left.isDown && this.allowMoveLeft)
        {
            this.sprite.flipX = false;
            this.sprite.setVelocityX(-180);
        }
        else if (this.cursors.right.isDown&& this.allowMoveRight)
        {
            this.sprite.flipX = true;
            this.sprite.setVelocityX(180);
        }
        else
        {
            this.sprite.setVelocityX(0);
        }

        if (jump)
        {
            this.sprite.setVelocityY(-(this.velocity));
        }

        // Check if we are in the flashing animation state
        if (this.flashing_animation_key) {
            this.sprite.anims.play(this.flashing_animation_key, true);
        }

    }

    createCursorKeys (keyboard){  }


}

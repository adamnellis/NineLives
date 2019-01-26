import Phaser from "phaser";
import MultiKey from "./multi-key.js";

export default class Player {
    constructor(scene, x, y, sheet) {
        this.scene = scene;

        // Create the animations we need from the player spritesheet
        const anims = scene.anims;

        // Create the physics-based sprite that we will move around and animate
        this.sprite = scene.matter.add.sprite(x, y, sheet);

        this.sprite.custom_object = this;

        this.sprite.setFixedRotation()
        this.scene.events.on("update", this.update, this);

        this.cursors = this.createCursorKeys(this.scene.input.keyboard);
    }

    update() {




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

        if (this.cursors.up.isDown)
        {
            this.sprite.setVelocityY(-10);
        }
        else if (this.cursors.down.isDown)
        {
            this.sprite.setVelocityY(10);
        }



    }

    createCursorKeys (keyboard){  }


}

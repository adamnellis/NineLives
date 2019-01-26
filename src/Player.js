import Phaser from "phaser";
import MultiKey from "./multi-key.js";

export default class Player {

    constructor(scene, x, y, sheet) {
        this.scene = scene;


        // Create the physics-based sprite that we will move around and animate
        this.sprite = scene.matter.add.sprite(x, y, sheet);


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

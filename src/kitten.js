import Player from "./Player";
import MultiKey from "./multi-key";
import Phaser from "phaser";

export default class Kitten extends Player{

    constructor(scene, x, y, sheet) {
        super(scene, x, y, sheet, 95, 70, 20);

        this.scene.anims.create({
            key: 'kitten_flash',
            frames: this.scene.anims.generateFrameNumbers('kittenAnimation', { start: 0, end: 1 }),
            frameRate: 3,
            repeat: 1
        });

        this.scene.anims.create({
            key: 'kitten_stand',
            frames: this.scene.anims.generateFrameNumbers('kittenAnimation', { start: 0, end: 0 }),
            frameRate: 0,
            repeat: 0
        });
        const { LEFT, RIGHT, UP, A, D, W } = Phaser.Input.Keyboard.KeyCodes;
        this.leftInput = new MultiKey(scene, [A]);
        this.rightInput = new MultiKey(scene, [D]);
        this.jumpInput = new MultiKey(scene, [W]);
    }




    do_flashing_animation() {
        this.flashing_animation_key = 'kitten_flash';
    }

}
import Player from "./Player";
import MultiKey from "./multi-key";
import Phaser from "phaser";

export default class Cat extends Player{


    constructor(scene, x, y, sheet) {
        super(scene, x, y, sheet, 150, 70, 28);

        this.scene.anims.create({
            key: 'cat_flash',
            frames: this.scene.anims.generateFrameNumbers('catAnimation', { start: 0, end: 1 }),
            frameRate: 3,
            repeat: 1
        });

        const { LEFT, RIGHT, UP, A, D, W } = Phaser.Input.Keyboard.KeyCodes;
        this.leftInput = new MultiKey(scene, [LEFT]);
        this.rightInput = new MultiKey(scene, [RIGHT]);
        this.jumpInput = new MultiKey(scene, [UP]);


    }

    do_flashing_animation() {
        this.flashing_animation_key = 'cat_flash';
    }
}
import Player from "./Player";

export default class Cat extends Player{


    constructor(scene, x, y, sheet) {
        super(scene, x, y, sheet, 150, 70);
        this.cursors = this.createCursorKeys(this.scene.input.keyboard);

        this.scene.anims.create({
            key: 'cat_flash',
            frames: this.scene.anims.generateFrameNumbers('catAnimation', { start: 0, end: 1 }),
            frameRate: 3,
            repeat: 1
        });
    }



    createCursorKeys (keyboard)
    {
        return keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.UP,
            down: Phaser.Input.Keyboard.KeyCodes.DOWN,
            left: Phaser.Input.Keyboard.KeyCodes.LEFT,
            right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
            space: Phaser.Input.Keyboard.KeyCodes.L,
            shift: Phaser.Input.Keyboard.KeyCodes.K
        });
    }

    do_flashing_animation() {
        this.flashing_animation_key = 'cat_flash';
    }
}
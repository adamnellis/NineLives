import Player from "./Player";

export default class Kitten extends Player{

    constructor(scene, x, y, sheet) {
        super(scene, x, y, sheet);
        this.cursors = this.createCursorKeys(this.scene.input.keyboard);

        this.scene.anims.create({
            key: 'kitten_flash',
            frames: this.scene.anims.generateFrameNumbers('kittenAnimation', { start: 0, end: 1 }),
            frameRate: 3,
            repeat: 1
        });
    }



    createCursorKeys (keyboard)
    {
        return keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
            space: Phaser.Input.Keyboard.KeyCodes.CTRL,
            shift: Phaser.Input.Keyboard.KeyCodes.SHIFT
        });
    }

    do_flashing_animation() {
        this.flashing_animation_key = 'kitten_flash';
        this.sprite.texture = "kittenAnimation";
    }

}
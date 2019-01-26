import Player from "./Player";

export default class Kitten extends Player{

    constructor(scene, x, y, sheet) {
        super(scene, x, y, sheet);
        this.cursors = this.createCursorKeys(this.scene.input.keyboard);


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


}
import Player from "./Player";

export default class Cat extends Player{


    constructor(scene, x, y, sheet) {
        super(scene, x, y, sheet);
        this.cursors = this.createCursorKeys(this.scene.input.keyboard);


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

}
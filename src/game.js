import Phaser from 'phaser';
import Player from "./player.js";

import constants from './constants.js';

export default new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function MainMenu ()
    {
        Phaser.Scene.call(this, { key: 'game' });
        window.MENU = this;
    },

    create: function ()
    {
        console.log('%c Game ', 'background: green; color: white; display: block;');

        this.matter.world.setBounds(0, 0, constants.game_width, constants.game_height);

        // Background image
        this.add.image(constants.game_width / 2, constants.game_height / 2, 'game-background');

        // Platforms
        const windowsill_physics = { restitution: 0.6, isStatic: true };
        this.matter.add.image(1028, 220, 'windowsill', null, windowsill_physics);
        this.matter.add.image(1028, 513, 'windowsill', null, windowsill_physics);
        this.matter.add.image(1376, 220, 'windowsill', null, windowsill_physics);
        this.matter.add.image(1376, 513, 'windowsill', null, windowsill_physics);
        this.matter.add.image(2166, 220, 'windowsill', null, windowsill_physics);
        this.matter.add.image(2166, 513, 'windowsill', null, windowsill_physics);
        this.matter.add.image(1778, 321, 'door-top', null, windowsill_physics);

        // TODO: More platforms from the background

        // // Moving obstacles
        // for (let i=0; i< 10; i++) {
        //     this.matter.add.sprite(Phaser.Math.Between(20, 700), 16, 'crate');
        // }

        // When user clicks anywhere, randomly decide if they won or lost!
        this.input.once('pointerup', function () {

            if (Math.random() >= 0.5) {
                this.scene.start('win');
            }
            else {
                this.scene.start('lose');
            }

        }, this);




        this.cursors = this.input.keyboard.createCursorKeys();
        this.player = new Player(this, 5, 10);



        // Make camera follow the player
        this.cameras.main.setBounds(0, 0, constants.game_width, constants.game_height);
        this.cameras.main.startFollow(this.player.sprite);
        this.cameras.main.setBackgroundColor('#858585');
    }


});

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
        this.add.image(400, 300, 'sky');

        // Static obstacles
        this.matter.add.image(200, 580, 'ground', null, { restitution: 0.6, isStatic: true });
        this.matter.add.image(600, 580, 'ground', null, { restitution: 0.6, isStatic: true });

        this.matter.add.image(600, 400, 'ground', null, { restitution: 0.6, isStatic: true });
        this.matter.add.image(50, 250, 'ground', null, { restitution: 0.6, isStatic: true });
        this.matter.add.image(750, 220, 'ground', null, { restitution: 0.6, isStatic: true });

        // Moving obstacles
        for (let i=0; i< 10; i++) {
            this.matter.add.sprite(Phaser.Math.Between(20, 700), 16, 'crate');
        }

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



    }


});

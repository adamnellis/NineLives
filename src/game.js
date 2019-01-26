import Phaser from 'phaser';
import Player from "./player.js";
import Car from "./car.js";

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

        const physics_x_start = 210;
        const physics_y_end = 40;
        this.matter.world.setBounds(physics_x_start, 0, constants.game_width - physics_x_start, constants.game_height - physics_y_end);

        // Background image
        this.add.image(constants.game_width / 2, constants.game_height / 2, 'game-background');

        // Platforms
        const invisible_objects = [];
        const windowsill_physics = { restitution: 0.6, isStatic: true };
        invisible_objects.push(this.matter.add.image(1028, 220, 'windowsill', null, windowsill_physics));
        invisible_objects.push(this.matter.add.image(1028, 513, 'windowsill', null, windowsill_physics));
        invisible_objects.push(this.matter.add.image(1376, 220, 'windowsill', null, windowsill_physics));
        invisible_objects.push(this.matter.add.image(1376, 513, 'windowsill', null, windowsill_physics));
        invisible_objects.push(this.matter.add.image(2166, 220, 'windowsill', null, windowsill_physics));
        invisible_objects.push(this.matter.add.image(2166, 513, 'windowsill', null, windowsill_physics));
        invisible_objects.push(this.matter.add.image(1778, 321, 'door-top', null, windowsill_physics));
        invisible_objects.push(this.matter.add.image(2554, 534, 'garage-side', null, windowsill_physics));
        invisible_objects.push(this.matter.add.image(3065, 323, 'garage-top', null, windowsill_physics));

        for (const object of invisible_objects) {
            object.alpha = 0; //0.8; // Set to 0.8 for debugging, and 0 for production
        }

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
        this.player = new Player(this, physics_x_start + 100, 10);
        this.car = new Car(this, constants.car_x, constants.car_y);


        // Make camera follow the player
        this.cameras.main.setBounds(0, 0, constants.game_width, constants.game_height);
        this.cameras.main.startFollow(this.player.sprite);
        this.cameras.main.setBackgroundColor('#858585');
    }


});

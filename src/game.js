import Phaser from 'phaser';

import Kitten from "./kitten.js";

import Cat from "./cat.js";
import Car from "./car.js";
import Player from "./Player.js"

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

        this.matter.world.enabled = true;

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

        this.kitten = new Kitten(this, physics_x_start + 100, 10, 'kittenAnimation');
        this.kitten.velocity = constants.kittenVelocity;
        this.cat = new Cat(this, physics_x_start + 100, 30, 'catAnimation');
        this.cat.velocity = constants.catVelocity;
        this.car = new Car(this, constants.car_x, constants.car_y);

        this.dot = this.matter.add.sprite(700, 700, 'dot');
        this.dot.visible = false;

        // Make camera follow the kitten
        this.cameras.main.setBounds(0, 0, constants.game_width, constants.game_height);
        this.cameras.main.startFollow(this.dot);
        this.cameras.main.setBackgroundColor('#858585');


        // Check for collisions
        this.matter.world.on('collisionstart', (event, bodyA, bodyB) => {
            // Find out if any of our custom objects collided
            let custom_object_a = bodyA.gameObject;
            if (custom_object_a !== null) {
                custom_object_a = custom_object_a.custom_object || null;
            }
            let custom_object_b = bodyB.gameObject;
            if (custom_object_b !== null) {
                custom_object_b = custom_object_b.custom_object || null;
            }
            // console.log('collision', custom_object_a, custom_object_b);

            // Check for player-car collisions
            if (((custom_object_a instanceof Kitten || custom_object_a instanceof Cat) && custom_object_b instanceof Car) ||
                ((custom_object_b instanceof Kitten || custom_object_b instanceof Cat) && custom_object_a instanceof Car)) {
                let cat = null;
                let car = null;
                if (custom_object_a instanceof Kitten || custom_object_a instanceof Cat) {
                    cat = custom_object_a;
                    car = custom_object_b;
                }
                else {
                    cat = custom_object_b;
                    car = custom_object_a;
                }

                // A player hit a car, so do the death animation
                cat.do_flashing_animation();
                car.stop_animation();
                this.cat_flash_timer = 300;
                this.matter.world.enabled = false;
            }
        });
        this.cat_flash_timer = null;

        this.events.on("update", this.update, this);

        console.log(this.matter.world)
        console.log(this.matter)
    },

    update: function() {
        var catX = this.cat.sprite.x;
        var kittenX = this.kitten.sprite.x;

        this.dot.x = (catX + kittenX)/ 2

        if(catX - kittenX > constants.viewport_width - 5){
            this.kitten.allowMoveRight = true;
            this.kitten.allowMoveLeft = false;
            this.cat.allowMoveRight = false;
            this.cat.allowMoveLeft = true;
        } else if(kittenX - catX > constants.viewport_width - 5){
            this.kitten.allowMoveRight = false;
            this.kitten.allowMoveLeft = true;
            this.cat.allowMoveRight = true;
            this.cat.allowMoveLeft = false;
        } else {
            this.kitten.allowMoveRight = true;
            this.kitten.allowMoveLeft = true;
            this.cat.allowMoveRight = true;
            this.cat.allowMoveLeft = true;
        }

        if (this.cat_flash_timer !== null) {
            // We are in a cat death animation
            if (this.cat_flash_timer < 0) {
                // Animation finished
                this.cat_flash_timer = null
                console.log('change scene')
                this.scene.start('lose', { death_type: 'car' });
            }
            this.cat_flash_timer -= 1;
        }
    }
});

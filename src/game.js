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

        // Clean up after restarting scene
        this.matter.world.enabled = true;
        if (this.car) {
            this.car.sprite.destroy()
        }

        this.carSpawed = false

        this.matter.world.setBounds(-1000, 0, constants.game_width - constants.physics_x_start, constants.game_height - constants.physics_y_end);

        // Background image
        let current_x = 0;
        this.add.image(current_x + constants.background1_width / 2, constants.game_height / 2, 'game-background-1');
        current_x += constants.background1_width;
        this.add.image(current_x + constants.background2_width / 2, constants.game_height / 2, 'game-background-2');
        current_x += constants.background2_width;
        this.add.image(current_x + constants.background3_width / 2, constants.game_height / 2, 'game-background-3');

        // Platforms

        // 1. before image.
        this.matter.add.image(1033, 224, 'windowsill', null, { restitution: 0.6, isStatic: true, chamfer: { radius: 10 } });
        this.matter.add.image(1033, 518, 'windowsill', null, { restitution: 0.6, isStatic: true, chamfer: { radius: 10 } });
        this.matter.add.image(1381, 223, 'windowsill', null, { restitution: 0.6, isStatic: true, chamfer: { radius: 10 } });
        this.matter.add.image(1381, 517, 'windowsill', null, { restitution: 0.6, isStatic: true, chamfer: { radius: 10 } });
        this.matter.add.image(1782, 324, 'door-top', null, { restitution: 0.6, isStatic: true, chamfer: { radius: 10 } });
        this.matter.add.image(2830, 488, 'garage-top', null, { restitution: 0.6, isStatic: true, chamfer: { radius: 10 } });
        this.matter.add.image(3295, 610, 'smallblock', null, { restitution: 0.6, isStatic: true, chamfer: { radius: 10 } });

        // basic jumping
        this.matter.add.image(6740, 240, 'door-top', null, { restitution: 0.6, isStatic: true, chamfer: { radius: 10 } });
        this.matter.add.image(6740, 515, 'door-top', null, { restitution: 0.6, isStatic: true, chamfer: { radius: 10 } });
        this.matter.add.image(7295, 240, 'windowsill', null, { restitution: 0.6, isStatic: true, chamfer: { radius: 10 } });
        this.matter.add.image(7295, 515, 'windowsill', null, { restitution: 0.6, isStatic: true, chamfer: { radius: 10 } });
        this.matter.add.image(7850, 324, 'door-top', null, { restitution: 0.6, isStatic: true, chamfer: { radius: 10 } });
        this.matter.add.image(8460, 240, 'door-top', null, { restitution: 0.6, isStatic: true, chamfer: { radius: 10 } });
        this.matter.add.image(8460, 515, 'door-top', null, { restitution: 0.6, isStatic: true, chamfer: { radius: 10 } });
        this.matter.add.image(9150, 240, 'door-top', null, { restitution: 0.6, isStatic: true, chamfer: { radius: 10 } });
        this.matter.add.image(9150, 515, 'door-top', null, { restitution: 0.6, isStatic: true, chamfer: { radius: 10 } });


        // TODO: More platforms from the background

        // // Moving obstacles
        // for (let i=0; i< 10; i++) {
        //     this.matter.add.sprite(Phaser.Math.Between(20, 700), 16, 'crate');
        // }


         var crate = this.matter.add.image(2545, 324, 'crate');
        crate.setScale(3)

        console.log('crate')
        console.log(crate)
        //crate.scale.setTo(15,15)


        this.kitten = new Kitten(this, 250, 720, 'kittenAnimation');
        this.kitten.velocity = constants.kittenVelocity;
        this.cat = new Cat(this, 600, 690, 'catAnimation');
        this.cat.velocity = constants.catVelocity;
        //this.car = new Car(this, constants.car_x, constants.car_y);

        // Foreground images
        this.add.image(200, 680, 'cardboard-box');
        this.add.image(2865, 568, 'garage-front');

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

    onPlayerCollide({ gameObjectB }) {
        if (!gameObjectB || !(gameObjectB instanceof Phaser.Tilemaps.Tile)) return;

        const tile = gameObjectB;

        // Check the tile property set in Tiled (you could also just check the index if you aren't using
        // Tiled in your game)
        if (tile.properties.isLethal) {
            // Unsubscribe from collision events so that this logic is run only once
            this.unsubscribePlayerCollide();

            this.kitten.freeze();
            this.cat.freeze();
        }


    },

    update: function() {
        var catX = this.cat.sprite.x;
        var kittenX = this.kitten.sprite.x;

        this.dot.x = (catX + kittenX)/ 2

        if(catX - kittenX > constants.viewport_width - constants.catDistanceOffset){
            this.kitten.allowMoveRight = true;
            this.kitten.allowMoveLeft = false;
            this.cat.allowMoveRight = false;
            this.cat.allowMoveLeft = true;
        } else if(kittenX - catX > constants.viewport_width - constants.catDistanceOffset){
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

        if(this.dot.x > constants.carSpawn && this.carSpawed == false){

             this.carSpawed = true;
             this.car = new Car(this, constants.car_x, constants.car_y);

        }



        if (this.cat_flash_timer !== null) {
            // We are in a cat death animation
            if (this.cat_flash_timer < 0) {
                // Animation finished
                this.cat_flash_timer = null;
                const cam = this.cameras.main;
                // cam.fade(250, 0, 0, 0);
                // cam.once("camerafadeoutcomplete", () => {
                //     this.scene.start('lose', { death_type: 'car' });
                // });
                this.scene.start('lose', { death_type: 'car' });
            }
            this.cat_flash_timer -= 1;
        }
    }
});

import Phaser from "phaser";
import MultiKey from "./multi-key.js";
import constants from './constants.js';


export default class Player {
    constructor(scene, x, y, sheet, height, width, offset) {
        this.scene = scene;


        this.allowMoveLeft = true;
        this.allowMoveRight = true;

        this.iterations_zero_velocity = 0;
        this.up_pressed_last_frame = false;

        // Create the physics-based sprite that we will move around and animate
        this.sprite = scene.matter.add.sprite(x, y, sheet, {friction:0});


        const { Body, Bodies } = Phaser.Physics.Matter.Matter; // Native Matter modules
        const { width: w, height: h } = this.sprite;
        const mainBody = Bodies.rectangle(0, offset, width, height, { chamfer: { radius: 10 } });
        this.sensors = {
            bottom: Bodies.rectangle(0, h * 0.5, w * 0.5, 2, { isSensor: true }),
            left: Bodies.rectangle(-w * 0.35, 20, 2, h * 0.5, { isSensor: true }),
            right: Bodies.rectangle(w * 0.35, 20, 2, h * 0.5, { isSensor: true })
        };

        const compoundBody = Body.create({
            parts: [mainBody, this.sensors.bottom, this.sensors.left, this.sensors.right],
            frictionStatic: 0,
            frictionAir: 0.02,
            friction: 0
        });

//
        this.sprite.custom_object = this;

        this.sprite
            .setExistingBody(compoundBody)
            .setFixedRotation() // Sets inertia to infinity so the player can't rotate
            .setPosition(x, y);

// Track which sensors are touching something
        this.isTouching = { left: false, right: false, ground: false };

        // Jumping is going to have a cooldown
        this.canJump = true;
        this.jumpCooldownTimer = null;

        // Before matter's update, reset the player's count of what surfaces it is touching.
        scene.matter.world.on("beforeupdate", this.resetTouching, this);

        scene.matterCollision.addOnCollideStart({
            objectA: [this.sensors.bottom, this.sensors.left, this.sensors.right],
            callback: this.onSensorCollide,
            context: this
        });
        scene.matterCollision.addOnCollideActive({
            objectA: [this.sensors.bottom, this.sensors.left, this.sensors.right],
            callback: this.onSensorCollide,
            context: this
        });

        // Track the keys

        const { LEFT, RIGHT, UP, A, D, W } = Phaser.Input.Keyboard.KeyCodes;

        this.destroyed = false;
        this.scene.events.on("update", this.update, this);
        this.scene.events.once("shutdown", this.destroy, this);
        this.scene.events.once("destroy", this.destroy, this);
    }

    onSensorCollide({ bodyA, bodyB, pair }) {

        if (bodyB.isSensor) return; // We only care about collisions with physical objects
        if (bodyA === this.sensors.left) {
            this.isTouching.left = true;
            if (pair.separation > 0.5) this.sprite.x += pair.separation - 0.5;
        } else if (bodyA === this.sensors.right) {
            this.isTouching.right = true;
            if (pair.separation > 0.5) this.sprite.x -= pair.separation - 0.5;
        } else if (bodyA === this.sensors.bottom) {
            this.isTouching.ground = true;
        }
    }

    resetTouching() {
        this.isTouching.left = false;
        this.isTouching.right = false;
        this.isTouching.ground = false;
    }

    freeze() {
        this.sprite.setStatic(true);
    }

    update() {
        if (this.destroyed) return;

        const sprite = this.sprite;
        const velocity = sprite.body.velocity;
        const isRightKeyDown = this.rightInput.isDown();
        const isLeftKeyDown = this.leftInput.isDown();
        const isJumpKeyDown = this.jumpInput.isDown();
        const isOnGround = this.isTouching.ground;
        const isInAir = !isOnGround;

        // --- Move the player horizontally ---

        // Adjust the movement so that the player is slower in the air
        const moveForce = isOnGround ? 10 : 5;

        if(isLeftKeyDown){
            sprite.setFlipX(false);
        }else if(isRightKeyDown){
            sprite.setFlipX(true);
        }


        //hack to bind to left
        var tooLeft = this.sprite.x < constants.physics_x_start;

        console.log('cat')
        console.log(this.sprite.x);

        if (isLeftKeyDown && !(isInAir && this.isTouching.left) && this.allowMoveLeft && !tooLeft) {
            this.sprite.setVelocityX(-moveForce);
        } else if (isRightKeyDown && !(isInAir && this.isTouching.right) && this.allowMoveRight) {
            this.sprite.setVelocityX(moveForce);
        } else {
            this.sprite.setVelocityX(0);
        }

        // --- Move the player vertically ---

        if (isJumpKeyDown && this.canJump && isOnGround) {
            sprite.setVelocityY(-this.velocity);

            // Add a slight delay between jumps since the bottom sensor will still collide for a few
            // frames after a jump is initiated
            this.canJump = false;
            this.jumpCooldownTimer = this.scene.time.addEvent({
                delay: 250,
                callback: () => (this.canJump = true)
            });
        }

        if (this.flashing_animation_key) {
            this.sprite.anims.play(this.flashing_animation_key, true);
        }

    }

    destroy() {
        // Clean up any listeners that might trigger events after the player is officially destroyed
        this.scene.events.off("update", this.update, this);
        this.scene.events.off("shutdown", this.destroy, this);
        this.scene.events.off("destroy", this.destroy, this);
        if (this.scene.matter.world) {
            this.scene.matter.world.off("beforeupdate", this.resetTouching, this);
        }
        const sensors = [this.sensors.bottom, this.sensors.left, this.sensors.right];
        this.scene.matterCollision.removeOnCollideStart({ objectA: sensors });
        this.scene.matterCollision.removeOnCollideActive({ objectA: sensors });
        if (this.jumpCooldownTimer) this.jumpCooldownTimer.destroy();

        this.destroyed = true;
        this.sprite.destroy();
     }





}
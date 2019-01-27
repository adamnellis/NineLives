import Phaser from 'phaser';

export default new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function Preloader ()
    {
        Phaser.Scene.call(this, { key: 'preloader' });
    },

    preload: function ()
    {
        this.load.image('title', 'assets/Title.png');
        this.load.image('game-background', 'assets/background.png');
        this.load.image('game-background-1', 'assets/background1.png');
        this.load.image('game-background-2', 'assets/background2.png');
        this.load.image('game-background-3', 'assets/background3.png');
        this.load.image('cardboard-box', 'assets/cardboardBox.png');
        this.load.image('garage-front', 'assets/garageFront.png');
        this.load.image('garage', 'assets/invisible/garage.png');
        this.load.image('fancy-building-top', 'assets/fancyBuildingTop.png');
        this.load.image('windowsill', 'assets/invisible/windowsill.png');
        this.load.image('smallblock', 'assets/small-block.png');
        this.load.image('door-top', 'assets/invisible/doorTop.png');
        this.load.image('garage-side', 'assets/invisible/garageSide.png');
        this.load.image('garage-top', 'assets/invisible/garageTop.png');

        this.load.image('logo', 'assets/logo.png');
        this.load.image('red-particle', 'assets/particles/red.png');
        this.load.image('flame-particle', 'assets/particles/flame1.png');

        this.load.image('sky', 'assets/sky.png');
        this.load.image('ground', 'assets/platform.png');
        this.load.image('crate', 'assets/crate.jpg');
        this.load.image('can', 'assets/can.png');
        this.load.image('yarn', 'assets/yarn.png');

        this.load.spritesheet('car', 'assets/car.png',
            { frameWidth: 691, frameHeight: 259 });
      
        this.load.spritesheet("kittenAnimation", "assets/fullKitten2.png", { frameWidth: 118, frameHeight: 140 });
        this.load.spritesheet("catAnimation", "assets/fullCat2.png", { frameWidth: 119, frameHeight: 220 });
        this.load.image("dot", "assets/dot.png");
    },


    create: function ()
    {
        console.log('%c Preloader ', 'background: green; color: white; display: block;');

        this.scene.start('mainmenu');

    }

});

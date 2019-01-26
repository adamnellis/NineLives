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
        this.load.image('windowsill', 'assets/windowsill.png');
        this.load.image('door-top', 'assets/doorTop.png');

        this.load.image('logo', 'assets/logo.png');
        this.load.image('red-particle', 'assets/particles/red.png');
        this.load.image('flame-particle', 'assets/particles/flame1.png');

        this.load.image('sky', 'assets/sky.png');
        this.load.image('ground', 'assets/platform.png');
        this.load.image('crate', 'assets/crate.jpg');
        this.load.image(
            "player",
            "assets/fullKitten.png",
            // {
            //     frameWidth: 32,
            //     frameHeight: 32,
            //     margin: 1,
            //     spacing: 2
            // }
        );
    },


    create: function ()
    {
        console.log('%c Preloader ', 'background: green; color: white; display: block;');

        this.scene.start('mainmenu');

    }

});

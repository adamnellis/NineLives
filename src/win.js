import Phaser from 'phaser';

export default new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function GameOver ()
    {
        Phaser.Scene.call(this, { key: 'win' });
        window.OVER = this;
    },

    create: function ()
    {
        console.log('%c Winner! ', 'background: green; color: white; display: block;');

        this.add.image(600, 400, 'win-background');

        this.add.text(200, 200, '🎉🎉🎉😺😺😺😺😺😺😺😺😺🎉🎉🎉', {font: '40px Courier', fill: '#ff0000'});

        this.add.image(600, 500, 'end-house');

        this.input.once('pointerup', function (event) {

            // this.scene.start('mainmenu');
            this.scene.start('lose', { reset: true });

        }, this);
    }

});
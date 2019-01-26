import Phaser from 'phaser';

export default new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function GameOver ()
    {
        Phaser.Scene.call(this, { key: 'lose' });
        window.OVER = this;
    },

    create: function ()
    {
        console.log('%c Loser! ', 'background: green; color: white; display: block;');

        this.add.text(100, 200, '😭😭😭😿😿😿😿😿😿😿😿😿😭😭😭', { font: '30px Courier', fill: '#ff0000' });

        this.input.once('pointerup', function (event) {

            this.scene.start('mainmenu');

        }, this);
    }

});
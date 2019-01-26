import Phaser from 'phaser';

export default new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function MainMenu ()
    {
        Phaser.Scene.call(this, { key: 'mainmenu' });
        window.MENU = this;
    },

    create: function ()
    {
        console.log('%c MainMenu ', 'background: green; color: white; display: block;');

        const text = this.add.text(150, 100, '😺😺😺😺😺😺😺😺😺', { font: '40px Courier', fill: '#ff0000' });
        text.setInteractive();
        text.once('pointerup', function () {

            this.scene.start('game');

        }, this);
    }

});

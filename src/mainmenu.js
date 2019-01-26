import Phaser from 'phaser';

import constants from './constants.js';

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

        this.add.image(constants.viewport_width / 2, constants.viewport_height / 2, 'title');

        // Wait a little before adding click handler, so that clicks from the game over screen don't trigger this
        setTimeout(() => {
            this.input.once('pointerup', function () {

                this.scene.start('game');

            }, this);
        }, 500);
    }

});

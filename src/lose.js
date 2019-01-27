import Phaser from 'phaser';

export default new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function GameOver ()
    {
        Phaser.Scene.call(this, { key: 'lose' });
        window.OVER = this;
        this.initialised = false
    },

    init: function (data)
    {
        if (data.death_type) {
            this.death_type = data.death_type;
        }
        else {
            this.death_type = null;
        }
        if (data.reset) {
            this.initialised = false;
            this.scene.start('mainmenu');
        }
    },

    create: function ()
    {
        console.log('%c Loser! ', 'background: green; color: white; display: block;');

        if (!this.initialised) {
            this.lives = ['😿', '😿', '😿', '😿', '😿', '😿', '😿', '😿', '😿'];
            this.current_life = 9;
            this.initialised = true;
        }

        if (this.current_life <= 0) {
            this.initialised = false
            this.scene.start('mainmenu');
            this.scene.stop();
        }
        this.current_life -= 1;

        this.lives[this.current_life] = '🚗';

        this.text = this.add.text(340, 250, this.lives.join(''), {font: '40px Courier', fill: '#ff0000'});

        const kitten = this.add.image(300, 580, 'kittenAnimation', 0);
        kitten.setFlipX(true);
        this.add.image(900, 560, 'catAnimation', 0);

        this.timer = 100;
    },

    update: function() {
        if (this.timer < 0) {
            this.scene.start('game');
            this.scene.stop();
        }
        this.timer -= 1;
    },

});

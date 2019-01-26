import 'phaser';

import constants from './constants.js';
import Preloader from './preloader.js';
import MainMenu from './mainmenu.js';
import Game from './game.js';
import Win from './win.js';
import Lose from './lose.js';

var config = {
    type: Phaser.AUTO,
    backgroundColor: '#858585',
    parent: 'phaser-example',
    width: constants.viewport_width,
    height: constants.viewport_height,
    physics: {
        default: 'matter',
        matter: {
            debug: false,
        }
    },

    scene: [ Preloader, MainMenu, Game, Win, Lose ]
};

var game = new Phaser.Game(config);


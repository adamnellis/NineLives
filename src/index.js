import 'phaser';


import constants from './constants.js';
import Preloader from './preloader.js';
import MainMenu from './mainmenu.js';
import Game from './game.js';
import Win from './win.js';
import Lose from './lose.js';
import PhaserMatterCollisionPlugin from "phaser-matter-collision-plugin";

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
        friction: 0
        }
    },

    scene: [ Preloader, MainMenu, Game, Win, Lose ],
    plugins: {
        scene: [
            {
                plugin: PhaserMatterCollisionPlugin, // The plugin class
                key: "matterCollision", // Where to store in Scene.Systems, e.g. scene.sys.matterCollision
                mapping: "matterCollision" // Where to store in the Scene, e.g. scene.matterCollision
            }
        ]
    }
};

var game = new Phaser.Game(config);


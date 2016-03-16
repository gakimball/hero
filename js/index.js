import Player from './lib/player';
import Bat from './lib/bat';
var game;

game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

var platforms;
var player;
var bat;

function preload() {
  game.load.image('background', 'assets/bg.png');
  game.load.image('guy', 'assets/guy.png');
  game.load.image('platform', 'assets/platform.jpg');
}

function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE);

  // Platforms
  platforms = game.add.group();
  platforms.enableBody = true;
  var ground = platforms.create(0, game.world.height - 64, 'platform');
  ground.scale.setTo(10, 1);
  ground.body.immovable = true;

  // Player
  player = new Player(game);

  // Bat
  bat = new Bat(game, {x: 500, y: 300});
}

function update() {
  game.physics.arcade.collide(player.entity, platforms);
  player.handleKeyboard();

  game.physics.arcade.overlap(player._laser.entity, bat.entity, () => {
    bat.kill();
  }, null);
}

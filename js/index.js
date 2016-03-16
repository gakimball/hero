import Player from './lib/player';
import Bat from './lib/bat';
import Inventory from './lib/inventory';

var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

var platforms;
var player;
var bat;
var bats;
var inventory;
var inventoryText;

const BAT_COORDS = [
  { x: 500, y: 300 },
  { x: 200, y: 200 },
  { x: 350, y: 100 }
]

function preload() {
  game.load.image('background', 'assets/bg.png');
  game.load.image('guy', 'assets/guy.png');
  game.load.image('platform', 'assets/platform.jpg');
  game.load.image('particle', 'assets/particle.jpg');
}

function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE);

  // Platforms
  platforms = game.add.group();
  platforms.enableBody = true;
  var ground = platforms.create(0, game.world.height - 64, 'platform');
  ground.scale.setTo(10, 1);
  ground.body.immovable = true;

  // Inventory
  inventory = new Inventory();

  // Player
  player = new Player(game, inventory);

  // Bat
  bats = game.add.group();
  for (let coords of BAT_COORDS) {
    new Bat(game, bats, coords);
  }

  // UI
  inventoryText = game.add.text(16, 16, `Bombs: ${inventory.bombs}`, {
    fontSize: '32px',
    fill: '#fff'
  });
}

function update() {
  game.physics.arcade.collide(player.entity, platforms);
  game.physics.arcade.collide(player._bomb.entity, platforms);
  player.handleKeyboard();

  game.physics.arcade.overlap(player._laser.entity, bats, (player, bat) => {
    bat.kill();
  }, null);

  inventoryText.text = `Bombs: ${inventory.bombs}`;
}

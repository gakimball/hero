import Player from './lib/player';
import Bat from './lib/bat';
import Inventory from './lib/inventory';
import UI from './lib/ui';
import loadAssets from './lib/loadAssets';

var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

var platforms;
var player;
var bat;
var bats;
var walls;
var inventory;
var ui;

const BAT_COORDS = [
  { x: 500, y: 300 },
  { x: 200, y: 200 },
  { x: 350, y: 100 }
]

function preload() {
  loadAssets(game);
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

  // Walls
  walls = game.add.group();
  walls.enableBody = true;
  let wall = walls.create(100, 300, 'platform');
  wall.scale.setTo(1, 4);
  wall.body.immovable = true;

  // UI
  ui = new UI(game, player, inventory);
}

function update() {
  game.physics.arcade.collide(player.entity, platforms);
  game.physics.arcade.collide(player.entity, walls);
  game.physics.arcade.collide(player._bomb.entity, platforms);
  player.handleKeyboard();

  game.physics.arcade.overlap(player._laser.entity, bats, (player, bat) => {
    bat.kill();
  }, null);

  game.physics.arcade.overlap(player._bomb.explosions, walls, (expl, wall) => {
    wall.destroy();
  });

  game.physics.arcade.overlap(player.entity, bats, (pl, bat) => {
    player.hurt();
    bat.destroy();
  })

  ui.update();
}

import Player from './lib/player';
import Bat from './lib/bat';
import Inventory from './lib/inventory';
import UI from './lib/ui';
import loadAssets from './lib/loadAssets';

var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

var ui;
var entities;
var inventory;

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
  let platforms = game.add.group();
  platforms.enableBody = true;

  let ground = platforms.create(0, game.world.height - 64, 'platform');
  ground.scale.setTo(10, 1);
  ground.body.immovable = true;

  // Inventory
  inventory = new Inventory();

  // Player
  let player = new Player(game, inventory);

  // Bat
  let bats = game.add.group();
  for (let coords of BAT_COORDS) {
    new Bat(game, bats, coords);
  }

  // Walls
  let walls = game.add.group();
  walls.enableBody = true;

  let wall = walls.create(100, 300, 'platform');
  wall.scale.setTo(1, 4);
  wall.body.immovable = true;

  // UI
  ui = new UI(game, player, inventory);

  entities = {
    player: player,
    platforms: platforms,
    walls: walls,
    bats: bats
  }
}

function update() {
  game.physics.arcade.collide(entities.player.entity, entities.platforms);
  game.physics.arcade.collide(entities.player.entity, entities.walls);
  game.physics.arcade.collide(entities.player._bomb.entity, entities.platforms);
  entities.player.handleKeyboard();

  game.physics.arcade.overlap(entities.player._laser.entity, entities.bats, (player, bat) => {
    bat.kill();
  }, null);

  game.physics.arcade.overlap(entities.player._bomb.explosions, entities.walls, (expl, wall) => {
    wall.destroy();
  });

  game.physics.arcade.overlap(entities.player.entity, entities.bats, (pl, bat) => {
    entities.player.hurt();
    bat.destroy();
  })

  ui.update();
}

import Laser from './laser';
import Bomb from './bomb';

const GRAVITY = 300;
const MOVE_SPEED = 150;
const MAX_LIFT = 150;
const LIFT_ACCELERATION = 750;

export default class Player {
  constructor(game, inventory) {
    this._game = game;
    this.inventory = inventory;
    this.entity = this._game.add.sprite(32, game.world.height / 2, 'guy');
    this._game.physics.arcade.enable(this.entity);
    this.entity.body.gravity.y = GRAVITY;
    this.entity.body.collideWorldBounds = true;
    this.entity.body.maxVelocity.y = MAX_LIFT;

    this._laser = new Laser(game, this);
    this._bomb = new Bomb(game);

    this.facing = 'right';
  }

  handleKeyboard() {
    var arrows = this._game.input.keyboard.createCursorKeys();
    var spaceBar = this._game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    this.resetMovement();

    // Left/right movement
    if (arrows.left.isDown) {
      this.moveLeft();
    }
    else if (arrows.right.isDown) {
      this.moveRight();
    }

    // Jetpack
    if (arrows.up.isDown) {
      this.startJetpack();
    }
    else {
      this.stopJetpack();
    }

    // Bomb
    if (arrows.down.isDown && this.entity.body.touching.down) {
      this.placeBomb();
    }

    // Laser
    if (spaceBar.isDown) {
      this._laser.activate();
    }
    else {
      this._laser.deactivate();
    }
  }

  resetMovement() {
    this.entity.body.velocity.x = 0;
  }

  moveLeft() {
    this.entity.body.velocity.x = -MOVE_SPEED;
    this.facing = 'left';
  }

  moveRight() {
    this.entity.body.velocity.x = MOVE_SPEED;
    this.facing = 'right';
  }

  startJetpack() {
    this.entity.body.acceleration.y = -LIFT_ACCELERATION;
  }

  stopJetpack() {
    this.entity.body.acceleration.y = 0;
  }

  placeBomb() {
    if (this.inventory.bombs === 0 || this._bomb.entity.alive) return;

    var x;
    var y = this.entity.y + this.entity.height - this._bomb.entity.height;

    if (this.facing === 'right') {
      x = this.entity.x + this.entity.width;
    }
    else {
      x = this.entity.x - this._bomb.entity.width;
    }

    this._bomb.place(x, y);
    this.inventory.bombs = this.inventory.bombs - 1;
  }
}

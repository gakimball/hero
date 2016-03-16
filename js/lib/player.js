import Laser from './laser';

export default class Player {
  constructor(game) {
    this._game = game;
    this.entity = this._game.add.sprite(32, game.world.height / 2, 'guy');
    this._game.physics.arcade.enable(this.entity);
    this.entity.body.gravity.y = 300;
    this.entity.body.collideWorldBounds = true;
    this._laser = new Laser(game, this);

    this.facing = 'right';
  }

  handleKeyboard() {
    var arrows = this._game.input.keyboard.createCursorKeys();
    var spaceBar = this._game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    var shift = this._game.input.keyboard.addKey(Phaser.Keyboard.SHIFT);

    this.resetMovement();

    // Left/right movement
    if (arrows.left.isDown) {
      this.moveLeft();
    }
    else if (arrows.right.isDown) {
      this.moveRight();
    }

    // Jetpack
    if (spaceBar.isDown) {
      this.startJetpack();
    }

    // Laser
    if (shift.isDown) {
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
    this.entity.body.velocity.x = -150;
    this.facing = 'left';
  }

  moveRight() {
    this.entity.body.velocity.x = 150;
    this.facing = 'right';
  }

  startJetpack() {
    this.entity.body.velocity.y = -150;
  }
}

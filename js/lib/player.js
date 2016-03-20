import Laser from './laser';
import Bomb from './bomb';

const GRAVITY = 300;
const MOVE_SPEED = 150;
const MAX_LIFT = 150;
const LIFT_ACCELERATION = 750;
const POWER_DECAY = 1000;
const SCALE = 0.35;

export default class Player {
  /**
   * Creates a new Player instance. Also initializes entities for the laser, bomb, and jetpack particle emitter.
   * @param {object} game - Phaser game instance.
   * @param {object} inventory - Inventory instance.
   */
  constructor(game, inventory) {
    this._game = game;
    this.inventory = inventory;
    this.entity = this._game.add.sprite(300, game.world.height / 2, 'guy');
    this._game.physics.arcade.enable(this.entity);
    this.entity.scale.setTo(SCALE, SCALE);
    this.entity.anchor.setTo(0.5, 1);
    this.entity.body.gravity.y = GRAVITY;
    this.entity.body.collideWorldBounds = true;
    this.entity.body.maxVelocity.y = MAX_LIFT;
    this.entity.body.bounce.setTo(0.5, 0.5);

    this._laser = new Laser(game, this);
    this._bomb = new Bomb(game);
    this._jetpackParticles = new JetpackParticles(game);

    this.facing = 'left';
    this.power = 100;
    this.moved = false;
    this.decayInterval = null;

    this.entity.update = Player.update.bind(this);
  }

  /**
   * Responds to keyboard input.
   *   - Left Arrow: move player left.
   *   - Right Arrow: move player right.
   *   - Up Arrow: activate jetpack.
   *   - Down Arrow: place bomb.
   *   - Spacebar: activate laser.
   */
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

  /**
   * Stops the player's movement.
   */
  resetMovement() {
    this.entity.body.velocity.x = 0;
  }

  /**
   * Moves the player to the left.
   */
  moveLeft() {
    this.entity.body.velocity.x = -MOVE_SPEED;
    this.entity.scale.x = SCALE;
    this.facing = 'left';

    if (!this.moved) {
      this.moved = true;
      this.startPowerDecay();
    }
  }

  /**
   * Moves the player to the right.
   */
  moveRight() {
    this.entity.body.velocity.x = MOVE_SPEED;
    this.entity.scale.x = -SCALE;
    this.facing = 'right';

    if (!this.moved) {
      this.moved = true;
      this.startPowerDecay();
    }
  }

  /**
   * Activates the jetpack, lifting the player up.
   */
  startJetpack() {
    this.entity.body.acceleration.y = -LIFT_ACCELERATION;
    this._jetpackParticles.start();
  }

  /**
   * Deactivates the jetpack.
   */
  stopJetpack() {
    this.entity.body.acceleration.y = 0;
    this._jetpackParticles.stop();
  }

  /**
   * Places a bomb, which detonates after a set interval.
   */
  placeBomb() {
    if (this.inventory.bombs === 0 || this._bomb.entity.alive) return;

    var x;
    var y = this.entity.y - this._bomb.entity.height;

    if (this.facing === 'right') {
      x = this.entity.x + Math.abs(this.entity.body.halfWidth);
    }
    else {
      x = this.entity.x - this.entity.body.halfWidth - this._bomb.entity.width;
    }

    this._bomb.place(x, y);
    this.inventory.bombs = this.inventory.bombs - 1;
  }

  /**
   * Begins draining the player's Power gauge.
   */
  startPowerDecay() {
    this.decayInterval = setInterval(() => {
      this.power -= 1;
      if (this.power === 0) clearInterval(this.decayInterval);
    }, POWER_DECAY);
  }

  /**
   * Override to the entity's `update()` method. Sets the position of the jetpack particle emitter to follow the player.
   */
  static update() {
    this._jetpackParticles.updatePosition(this.entity.x, this.entity.y);
  }
}

class JetpackParticles {
  /**
   * Creates a particle emitter for the player's jetpack.
   * @param {object} game - Phaser game instance.
   */
  constructor(game) {
    this.emitter = game.add.emitter(0, 0);
    this.emitter.makeParticles('particle');
    this.emitter.maxParticleScale = 0.4;
    this.emitter.minParticleScale = 0.4;
    this.emitter.setXSpeed(0, 0);
    this.emitter.setYSpeed(100, 100);
    this.emitter.start(false, 500, 150, 0);
    this.emitter.on = false;
  }

  /**
   * Updates the position of the emitter.
   * @param {number} x - x position.
   * @param {number} y - y position.
   */
  updatePosition(x, y) {
    this.emitter.x = x;
    this.emitter.y = y;
  }

  /**
   * Start the particle emitter.
   */
  start() {
    this.emitter.on = true;
  }

  /**
   * Pause the particle emitter.
   */
  stop() {
    this.emitter.on = false;
  }
}

export default class Bat {
  /**
   * Static object that defines tween settings for the bat's movement.
   */
  static get tweenProps() {
    return {
      offset: 25,
      duration: 1000,
      easing: Phaser.Easing.Default
    }
  }

  /**
   * Creates a new Bat.
   * @param {object} game - Phaser game instance.
   * @param {object} group - Phaser group to place the Bat in.
   * @param {object} position - x and y position of the Bat.
   */
  constructor(game, group, position) {
    this._game = game;
    this.entity = group.create(position.x, position.y, 'eye');
    this._game.physics.arcade.enable(this.entity);
    this.entity.scale.setTo(0.5, 0.5);
    this.entity.body.collideWorldBounds = true;
    this.entity.animations.add('spin', [0, 1, 2, 3], 1, true);
    this.entity.animations.play('spin');
    this.entity.animations.currentAnim.setFrame(getRandomInt(0, 4), true);

    this.move();
  }

  /**
   * Initializes position tweening.
   */
  move() {
    const props = Bat.tweenProps;

    var tween = this._game.add.tween(this.entity)
      .to({ y: this.entity.body.y + props.offset }, props.duration, props.easing, true, 0, -1, true);

    tween.start();
  }

  /**
   * Destroys the Bat object.
   */
  kill() {
    this.entity.destroy();
  }
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

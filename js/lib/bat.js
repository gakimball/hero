export default class Bat {
  /**
   * Static object that defines tween settings for the bat's movement.
   */
  static get tweenProps() {
    return {
      offset: 50,
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
    this.entity = group.create(position.x, position.y, 'platform');
    this._game.physics.arcade.enable(this.entity);
    this.entity.scale.setTo(0.25, 0.25);
    this.entity.body.collideWorldBounds = true;

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

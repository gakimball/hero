export default class Bat {
  static get tweenProps() {
    return {
      offset: 50,
      duration: 1000,
      easing: Phaser.Easing.Default
    }
  }

  constructor(game, group, position) {
    this._game = game;
    this.entity = group.create(position.x, position.y, 'platform');
    this._game.physics.arcade.enable(this.entity);
    this.entity.scale.setTo(0.25, 0.25);
    this.entity.body.collideWorldBounds = true;

    this.move();
  }

  move() {
    const props = Bat.tweenProps;

    var tween = this._game.add.tween(this.entity)
      .to({ y: this.entity.body.y + props.offset }, props.duration, props.easing, true, 0, -1, true);

    tween.start();
  }

  kill() {
    this.entity.destroy();
  }
}

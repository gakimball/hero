export default class Laser {
  constructor(game, player) {
    this._game = game;
    this._player = player;
    this.entity = this._game.add.sprite(0, 0, 'platform');
    this._game.physics.arcade.enable(this.entity);
    this.entity.scale.setTo(0.5, 0.1);

    this.entity.update = Laser.update.bind(this);
    this.deactivate();
  }

  activate() {
    this.entity.revive();
  }

  deactivate() {
    this.entity.kill();
  }

  static update() {
    this.entity.y = this._player.entity.y - 8;

    if (this._player.facing === 'right') {
      this.entity.x =
        this._player.entity.x
        + Math.abs(this._player.entity.body.halfWidth);
    }
    else {
      this.entity.x =
        this._player.entity.x
        - Math.abs(this._player.entity.body.halfWidth)
        - this.entity.width;
    }
  }
}

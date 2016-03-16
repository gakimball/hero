export default class Laser {
  constructor(game, player) {
    this._game = game;
    this._player = player;
    this.entity = this._game.add.sprite(0, 0, 'platform');
    this._game.physics.arcade.enable(this.entity);
    this.entity.scale.setTo(0.5, 0.1);

    this.entity.update = Laser.update.bind(this);
  }

  static update() {
    this.entity.y = this._player.entity.y + (this._player.entity.height / 2);

    if (this._player.facing === 'right') {
      this.entity.x = this._player.entity.x + this._player.entity.width;
    }
    else {
      this.entity.x = this._player.entity.x - this.entity.width;
    }
  }
}

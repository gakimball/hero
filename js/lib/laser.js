export default class Laser {
  /**
   * Creates a new instance of a Laser.
   * @param {object} game - Phaser game instnace.
   * @param {object} player - Player entity.
   */
  constructor(game, player) {
    this._game = game;
    this._player = player;
    this.entity = this._game.add.sprite(0, 0, 'platform');
    this._game.physics.arcade.enable(this.entity);
    this.entity.scale.setTo(0.5, 0.1);

    this.entity.update = Laser.update.bind(this);
    this.deactivate();
  }

  /**
   * Activate the laser so it can kill things.
   */
  activate() {
    this.entity.revive();
  }

  /**
   * Stop the laser from firing.
   */
  deactivate() {
    this.entity.kill();
  }

  /**
   * Override to the Laser's `update()` method. It repositions the laser to the left or right of the player, depending on the player's facing direction.
   */
  static update() {
    this.entity.y = this._player.entity.y - 11;

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

const EXPLODE_TIMER = 3000;

export default class Bomb {
  constructor(game) {
    this._game = game;
    this.entity = this._game.add.sprite(0, 0, 'platform');
    this.timeout;

    this._game.physics.arcade.enable(this.entity);
    this.entity.scale.setTo(0.2, 0.2);
    this.entity.body.gravity.y = 1000;
    this.entity.body.collideWorldBounds = true;

    this.entity.kill();
  }

  place(x, y) {
    this.entity.x = x;
    this.entity.y = y;
    this.entity.revive();
    this.timeout = setTimeout(this.explode.bind(this), EXPLODE_TIMER);
  }

  explode() {
    let explosion = Bomb.explosion(this._game);
    this.entity.kill();
    explosion.x = this.entity.x + (this.entity.width / 2);
    explosion.y = this.entity.y + (this.entity.height / 2);
    explosion.start(true, 2000, null, 50);
  }

  static explosion(game) {
    let emitter = game.add.emitter(0, 0, 50);
    emitter.makeParticles('particle');
    emitter.gravity = 200;
    return emitter;
  }
}

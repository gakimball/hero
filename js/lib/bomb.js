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

    this.setupExplosions();
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
    this.positionExplosions();
    explosion.x = this.entity.x + (this.entity.width / 2);
    explosion.y = this.entity.y + (this.entity.height / 2);
    explosion.start(true, 2000, null, 50);
    setTimeout(this.killExplosions.bind(this), 100);
  }

  static explosion(game) {
    let emitter = game.add.emitter(0, 0, 50);
    emitter.makeParticles('particle');
    emitter.gravity = 200;
    return emitter;
  }

  setupExplosions() {
    let explosions = this._game.add.group();

    explosions.enableBody = true;
    for (let i = 0; i < 2; i++) {
      let expl = explosions.create(0, 0);
      expl.scale.x = this.entity.width;
      expl.scale.y = this.entity.height;
      expl.body.immovable = true;
      expl.kill();
    }

    this.explosions = explosions;
  }

  positionExplosions() {
    const COORDS = [
      {
        x: this.entity.x + this.entity.width,
        y: this.entity.y
      },
      {
        x: this.entity.x - this.entity.width,
        y: this.entity.y
      }
    ];

    for (let i = 0; i < this.explosions.length; i++) {
      let expl = this.explosions.getAt(i);
      expl.x = COORDS[i].x;
      expl.y = COORDS[i].y;
      expl.revive();
    }
  }

  killExplosions() {
    for (let i = 0; i < this.explosions.length; i++) {
      let expl = this.explosions.getAt(i);
      expl.kill();
    }
  }
}

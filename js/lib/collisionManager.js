export default class CollisionManager {
  constructor(game, entities) {
    this.game = game;
    this.entities = entities;

    this.defineCollisions();
  }

  defineCollisions() {
    let entities = this.entities;

    this.COLLISIONS = [
      [entities.player.entity, entities.platforms],
      [entities.player.entity, entities.walls],
      [entities.player._bomb.entity, entities.platforms]
    ];
  }

  handleCollisions() {
    for (var pair of this.COLLISIONS) {
      this.game.physics.arcade.collide.apply(this.game.physics.arcade, pair);
    }
  }

  handleOverlaps() {
    let overlap = this.game.physics.arcade.overlap.bind(this.game.physics.arcade);
    let entities = this.entities;

    overlap(entities.player._laser.entity, entities.bats, (player, bat) => {
      bat.kill();
    }, null);

    overlap(entities.player._bomb.explosions, entities.walls, (expl, wall) => {
      wall.destroy();
    });

    overlap(entities.player.entity, entities.bats, (pl, bat) => {
      entities.player.hurt();
      bat.destroy();
    });
  }
}

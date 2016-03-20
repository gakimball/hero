export default class CollisionManager {
  /**
   * Creates a collision manager, which runs Phaser methods for checking collisions and overlaps.
   * @param {object} game - Phaser game instance.
   * @param {object} entities - Object of entities to reference.
   */
  constructor(game, entities) {
    this.game = game;
    this.entities = entities;

    this.defineCollisions();
  }

  /**
   * Sets up pairs of entities that should collide.
   */
  defineCollisions() {
    let entities = this.entities;

    this.COLLISIONS = [
      [entities.player.entity, entities.platforms],
      [entities.player.entity, entities.walls],
      [entities.player._bomb.entity, entities.platforms]
    ];
  }

  /**
   * Calls Phaer's `game.physics.arcade.collide()` for each set of entities defined in `defineCollisions()`. Runs during Phaser's `update()` step.
   */
  handleCollisions() {
    for (var pair of this.COLLISIONS) {
      this.game.physics.arcade.collide.apply(this.game.physics.arcade, pair);
    }
  }

  /**
   * Calls Phaser's `game.physics.arcade()` for entities that need it. Runs during Phaser's `update()` step.
   */
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

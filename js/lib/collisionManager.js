export default class CollisionManager {
  /**
   * Creates a collision manager, which runs Phaser methods for checking collisions and overlaps.
   * @param {object} game - Phaser game instance.
   * @param {object} entities - Object of entities to reference.
   */
  constructor(game, entities, map) {
    this.game = game;
    this.entities = entities;
    this.map = map;
    this.collisions = [];
  }

  /**
   * Sets up pairs of entities that should collide.
   */
  collide(a, b) {
    this.collisions.push([a, b]);
  }

  /**
   * Calls Phaer's `game.physics.arcade.collide()` for each set of entities defined in `defineCollisions()`. Runs during Phaser's `update()` step.
   */
  handleCollisions() {
    for (let pair of this.collisions) {
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

    overlap(entities.player._bomb.explosions, this.map.entities.walls, (expl, wall) => {
      wall.destroy();
    });

    overlap(entities.player.entity, entities.bats, (pl, bat) => {
      entities.player.hurt();
      bat.destroy();
    });
  }
}

export default class UI {
  /**
   * Creates a UI manager instance, which draws text on the screen.
   * @param {object} game - Phaser game instance.
   * @param {object} player - Player instance.
   * @param {object} inventory - Inventory instance.
   */
  constructor(game, player, inventory) {
    this._game = game;
    this._player = player;
    this._inventory = inventory;

    this.init();
  }

  /**
   * Text styles used for all UI elements.
   */
  static get textStyles() {
    return {
      font: '100 20px Helvetica Neue',
      fill: '#fff'
    }
  }

  /**
   * Creates text objects for the UI and sets their initial values.
   */
  init() {
    this.inventoryText = this._game.add.text(20, 20, `Bombs: ${this._inventory.bombs}`, UI.textStyles);
    this.powerText = this._game.add.text(20, 50, `Power: ${this._player.power}`, UI.textStyles);
    this.lifeText = this._game.add.text(20, 80, `Life: ${this._player.life}`, UI.textStyles);
  }

  /**
   * Updates UI text.
   */
  update() {
    this.inventoryText.text = `Bombs: ${this._inventory.bombs}`;
    this.powerText.text = `Power: ${this._player.power}`;
    this.lifeText.text = `Life: ${this._player.life}`;
  }
}

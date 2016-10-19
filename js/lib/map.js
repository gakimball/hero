import Bat from '../entities/bat';

const ROOM_1 = `





000  000
`;

const ROOM_2 = `
000  000
  w
  w
  we
  w
0 0000 0
`;

export default class Room {
  constructor(game) {
    this.game = game;
    this.layout = ROOM_2;
    this.entities = {
      platforms: game.add.group(),
      enemies: game.add.group(),
      walls: game.add.group()
    }

    this.entities.platforms.enableBody = true;
    this.entities.platforms.width = 100;
    this.entities.platforms.height = 100;

    this.entities.walls.enableBody = true;
    this.entities.walls.width = 100;
    this.entities.walls.height = 100;
  }

  build() {
    const layout = this.layout.split('\n').slice(1, -1);

    for (let y in layout) {
      for (let x in layout[y]) {
        let object = layout[y][x];
        switch (object) {
          case '0':
            let platform = this.entities.platforms.create(x * 100, y * 100, 'platform');
            platform.body.immovable = true;
            break;
          case 'w':
            let wall = this.entities.walls.create(x * 100, y * 100, 'platform');
            wall.body.immovable = true;
            wall.tint = '0xff0000';
            break;
          case 'e':
            let pos = { x: x * 100, y: y * 100 };
            let eye = new Bat(this.game, this.entities.enemies, pos);
            break;
        }
      }
    }
  }

  getEntities() {
    return this.entities;
  }
}

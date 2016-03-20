export default function loadAssets(game) {
  game.load.image('background', 'assets/bg.png');
  game.load.image('guy', 'assets/cadet.png');
  game.load.image('platform', 'assets/platform.jpg');
  game.load.image('particle', 'assets/particle.png');
  game.load.spritesheet('eye', 'assets/eye.png', 70, 70);
}

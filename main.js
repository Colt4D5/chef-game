const canvas = document.querySelector('canvas#world');
const ctx = canvas.getContext('2d');
import playerImg from './images/characters/people/hero.png';

class Game {
  constructor(){
    this.frame = 0;
  }
}
const game = new Game();

class Sprite {
  constructor(x, y, src, cols, rows) {
    this.loaded = false;
    this.position = { x, y };
    this.speed = 1;
    this.cols = cols;
    this.rows = rows;
    this.frame = {
      x: 0,
      y: 0,
      w: null,
      h: null
    };
    this.src = src;
    this.image = new Image();
    this.image.src = this.src;
    this.image.onload = () => {
      this.frame.w = this.image.width / this.cols;
      this.frame.h = this.image.height / this.rows;
      this.init(ctx);
    };
    this.controls = {
      j: false,
      l: false,
      k: false,
      h: false,
    };
    this.lastDirection = 'j';
    this.directionArr = ['j','l','k','h'];
  }
  init(ctx) {
    this.loaded = true;
  }
  draw(ctx) {
    ctx.drawImage(
      player.image, 
      this.frame.x * this.frame.w,
      this.frame.y * this.frame.h,
      this.frame.w,
      this.frame.h,
      this.position.x, 
      this.position.y,
      this.frame.w,
      this.frame.h,
    );
  }
  update(ctx) {
    if (this.controls.j && !this.controls.k) {
      this.position.y += this.speed;
      this.lastDirection = 'j';
    }
    if (!this.controls.j && this.controls.k) {
      this.position.y -= this.speed;
      this.lastDirection = 'k';
    }
    if (this.controls.h && !this.controls.l) {
      this.position.x -= this.speed;
      this.lastDirection = 'h';
    }
    if (!this.controls.h && this.controls.l) {
      this.position.x += this.speed;
      this.lastDirection = 'l';
    }
    this.frame.y = this.directionArr.indexOf(this.lastDirection);
    this.draw(ctx);
  }
}

const player = new Sprite(canvas.width / 2, canvas.height / 2, playerImg, 4, 4);

const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (game.frame % 12 === 0) {
    player.frame.x >= player.cols - 1 ? player.frame.x = 0 : player.frame.x++;
  }
  if (player.loaded) {
    player.update(ctx);
  }

  game.frame++;

  requestAnimationFrame(animate);
}
animate();

addEventListener('keydown', handleKeydown);
addEventListener('keyup', handleKeyup);

function handleKeydown(e) {
  if (!['h','j','k','l'].includes(e.key)) return;
  player.controls[e.key] = true;
}

function handleKeyup(e) {
  if (!['h','j','k','l'].includes(e.key)) return;
  player.controls[e.key] = false;
}

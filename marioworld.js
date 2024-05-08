class Game {
  constructor() {
    this.canvas = document.getElementById("gameCanvas");
    this.ctx = this.canvas.getContext("2d");
    this.mario = new Mario(this);
    this.fireballs = [];
  }

  play() {
    setInterval(() => {
      this.resetBackground();
      this.mario.update();

      this.mario.draw(this.ctx);
      this.fireballs.forEach((fireball) => {
        fireball.update();
        fireball.draw(this.ctx);
      });
    }, 33);
  }

  resetBackground() {
    //clear the canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    // draw the sky
    this.ctx.fillStyle = "lightblue";
    this.ctx.fillRect(0, 0, this.canvas.width, 200 + 32);

    this.ctx.fillStyle = "#C4A484";
    this.ctx.fillRect(0, 232, this.canvas.width, this.canvas.height - 232);
  }

  resetJump() {
    this.jumping = false;
    this.jumpingVelocity = 0;
  }
}

class Mario {
  constructor(game) {
    this.y = 200;
    this.x = 50;
    this.xVelocity = 0;
    this.jumping = false;
    this.yVelocity = 0;
    this.movingRight = false;
    this.movingLeft = false;
    this.game = game;

    document.onkeydown = (event) => {
      if (event.keyCode == 77) {
        this.fireball();
      }

      if (event.keyCode === 32) {
        if (this.jumping === false) {
          this.jump();
        }
      }

      if (event.keyCode === 68) {
        this.movingRight = true;
      }

      if (event.keyCode === 65) {
        this.movingLeft = true;
      }
    };

    document.onkeyup = (event) => {
      if (event.keyCode === 68) {
        this.movingRight = false;
      }

      if (event.keyCode === 65) {
        this.movingLeft = false;
      }
    };
  }

  draw(ctx) {
    const marioImage = document.getElementById("mario");

    ctx.drawImage(marioImage, this.x, this.y, 32, 32);
  }

  update() {
    if (this.jumping) {
      this.yVelocity += 1;
      this.y += this.yVelocity;
      if (this.y === 200) {
        this.jumping = false;
        this.yVelocity = 0;
      }
    }

    if (this.movingRight) {
      if (this.jumping) {
        this.xVelocity += 0.1;
      } else {
        this.xVelocity += 2;
      }
      this.xVelocity = Math.min(4, this.xVelocity);
    }

    if (this.movingLeft) {
      if (this.jumping) {
        this.xVelocity -= 0.1;
      } else {
        this.xVelocity -= 2;
      }
      this.xVelocity = Math.max(-4, this.xVelocity);
    }

    if (!this.jumping) {
      this.xVelocity *= 0.7;
    }

    this.x += this.xVelocity;
  }

  jump() {
    this.yVelocity = -12;
    this.jumping = true;
  }

  fireball() {
    const fireball = new Fireball(this.x, this.y, this.game);
    this.game.fireballs.push(fireball);

    console.log(this.game.fireballs.length);
  }
}

class Fireball {
  constructor(x, y, game) {
    this.x = x + 32;
    this.y = y + 16;
    this.game = game;
    this.xVelocity = 6;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, 8, 0, 2 * Math.PI);
    ctx.fillStyle = "orange";
    ctx.strokeStyle = "orange";
    ctx.lineWidth = 1;
    ctx.fill();
    ctx.stroke();
  }

  update() {
    this.x += this.xVelocity;
    if (this.x > 600) {
      // this.game.fireballs.shift();
      this.game.fireballs = this.game.fireballs.filter(
        (fireball) => fireball != this
      );
    }
  }
}

const game = new Game();

game.play();

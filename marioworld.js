class Game {
  constructor() {
    this.canvas = document.getElementById("gameCanvas");
    this.ctx = this.canvas.getContext("2d");
    this.mario = new Mario();
  }

  play() {
    setInterval(() => {
      this.resetBackground();
      this.mario.draw(this.ctx);
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
  constructor() {
    this.y = 200;
    this.x = 50;
    this.xVelocity = 0;
    this.jumping = false;
    this.yVelocity = 0;
    this.movingRight = false;
    this.movingLeft = false;

    document.onkeydown = (event) => {
      if (event.keyCode === 32) {
        if (this.jumping === false) {
          this.jump();
        }
      }

      if (event.keyCode === 39) {
        if (this.jumping) return;
        this.movingRight = true;
      }

      if (event.keyCode === 37) {
        if (this.jumping) return;

        this.movingLeft = true;
      }
    };

    document.onkeyup = (event) => {
      if (event.keyCode === 39) {
        this.movingRight = false;
      }

      if (event.keyCode === 37) {
        this.movingLeft = false;
      }
    };
  }

  draw(ctx) {
    const marioImage = document.getElementById("mario");

    this.update();
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
      this.xVelocity += 2;
      this.xVelocity = Math.min(4, this.xVelocity);
    }

    if (this.movingLeft) {
      this.xVelocity -= 2;
      this.xVelocity = Math.max(-4, this.xVelocity);
    }

    if (!this.jumping) {
      this.xVelocity *= 0.9;
    }

    this.x += this.xVelocity;
  }

  jump() {
    this.yVelocity = -12;
    this.jumping = true;
  }
}

const game = new Game();

game.play();

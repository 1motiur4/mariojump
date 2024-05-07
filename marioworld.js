class Game {
  constructor() {
    this.canvas = document.getElementById("gameCanvas");
    this.ctx = this.canvas.getContext("2d");
    this.marioY = 200;
    this.marioX = 50;
    this.marioXVelocity = 0;
    this.jumping = false;
    this.jumpingVelocity = 0;
  }

  play() {
    setInterval(() => {
      this.resetBackground();
      this.drawMario();
    }, 33);

    document.onkeydown = (event) => {
      if (event.keyCode === 32) {
        if (this.jumping === false) {
          this.jumping = true;
          this.jump();
        }
      }

      if (event.keyCode === 39) {
        this.marioXVelocity += 5;
      }
      if (event.keyCode === 37) {
        this.marioXVelocity -= 5;
      }
    };
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

  drawMario() {
    const marioImage = document.getElementById("mario");
    this.marioX += this.marioXVelocity;
    this.ctx.drawImage(marioImage, this.marioX, this.marioY, 32, 32);
  }

  jump() {
    this.jumpingVelocity = -12;
    const jumpInterval = setInterval(() => {
      console.log("Jumping now!");
      this.jumpingVelocity += 1;
      this.marioY += this.jumpingVelocity;
      if (this.marioY === 200) {
        clearInterval(jumpInterval);
        this.resetJump();
      }
    }, 33);
  }

  resetJump() {
    this.jumping = false;
    this.jumpingVelocity = 0;
  }
}

const game = new Game();

game.play();

class Game {
  constructor() {
    this.canvas = document.getElementById("gameCanvas");
    this.ctx = this.canvas.getContext("2d");
    this.marioY = 200;
  }

  play() {
    setInterval(() => {
      this.resetBackground();
      this.drawMario();
    }, 33);

    document.onkeydown = (event) => {
        if (event.keyCode === 32) {
            this.marioY = 100;
        } 
    }

    document.onkeyup = (event) => {
        if (event.keyCode === 32) {
            this.marioY = 200;
        }
    }
  }

  resetBackground() {
    //clear the canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    // draw the sky
    this.ctx.fillStyle = "lightblue";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawMario() {
    // draw a red rectangle
    this.ctx.fillStyle = "red";
    this.ctx.fillRect(50, this.marioY, 25, 50);
  }
}

const game = new Game();

game.play();

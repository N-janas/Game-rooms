// TEST lights out, to ma być pobrane z API
var contentFromApiTEST = `
<html lang="pl">
  <head>
    <meta name="author" content="Rydzyk Cezary" />
    <meta charset="utf8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <title>Lights Out</title>
  </head>

  <style>
    @import url("https://fonts.googleapis.com/css2?family=Open+Sans&display=swap");

    /* common */
    * {
      margin: 0;
      padding: 0;
    }

    html {
      font-family: "Open Sans", sans-serif;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        0deg,
        rgb(66, 195, 34) 0%,
        rgb(45, 253, 191) 100%
      );
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    #info {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 50px;
      background-color: aliceblue;
    }

    #counter {
      float: left;
      font-size: 28px;
      width: 200px;
    }

    #tips {
      background-color: #4caf50; /* Green */
      border: none;
      color: white;
      padding: 8px 16px;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 16px;
    }

    #container {
      background-image: url(https://i.imgur.com/NTnjsPc.jpg);
      background-repeat: no-repeat;
      background-position: center center;
    }

    /* pc */
    @media (pointer: fine) {
      body {
        margin: 0 auto;
        width: 400px;
        height: 600px;
      }

      #container {
        width: 100%;
        height: 550px;
      }
    }

    /*phone*/
    @media (pointer: none), (pointer: coarse) {
      body {
        margin: 0 auto;
        width: 100%;
        height: 100%;
      }

      #container {
        width: 100%;
        height: calc(100% - 50px);
        overflow: auto;
      }
    }
  </style>

  <body onresize="resize()">
    <div id="info">
      <p id="counter"></p>
      <button id="tips"></button>
    </div>

    <div id="container"></div>

    <script>
      class App {
        BACK_O = "#FC766AFF";
        BACK_E = "#5B84B1FF";
        BACK_N = "Transparent";
        COUNTER_TEXT = "Ruchy - ";
        SHOW_TIPS_TEXT = "Pokaż podpowiedzi";
        HIDE_TIPS_TEXT = "Ukryj podpowiedzi";
        TIPS_SIGN = "&#128161;";

        constructor(width, height) {
          this.width = width;
          this.height = height;

          this.moves = 0;

          this.container = document.getElementById("container");
          this.counter = document.getElementById("counter");
          this.tips = document.getElementById("tips");

          this.grid = this.initGridData();

          this.counter.innerText = this.COUNTER_TEXT + this.moves;
          this.tips.innerText = this.SHOW_TIPS_TEXT;

          this.initGridLayout();
          this.setTips();

          let thi = this;
          this.tips.addEventListener("click", function () {
            thi.changeTips();
          });
        }

        initGridData() {
          const grid = Array.from(
            Array(this.width),
            () => new Array(this.height)
          );

          this.answers = Array.from(
            Array(this.width),
            () => new Array(this.height)
          );

          for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
              grid[x][y] = false;
            }
          }

          for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
              if (Math.random() > 0.5) {
                this.answers[x][y] = true;

                grid[x][y] ^= true;
                if (x - 1 >= 0) {
                  grid[x - 1][y] ^= true;
                }
                if (x + 1 < this.width) {
                  grid[x + 1][y] ^= true;
                }
                if (y + 1 < this.height) {
                  grid[x][y + 1] ^= true;
                }
                if (y - 1 >= 0) {
                  grid[x][y - 1] ^= true;
                }
              } else {
                this.answers[x][y] = false;
              }
            }
          }

          return grid;
        }

        setTips() {
          if (this.tips.innerText == this.HIDE_TIPS_TEXT) {
            for (let y = 0; y < this.height; y++) {
              for (let x = 0; x < this.width; x++) {
                if (this.answers[x][y]) {
                  let div = document.getElementById(x + " " + y);
                  div.innerHTML = this.TIPS_SIGN;
                }
              }
            }
          } else {
            for (let y = 0; y < this.height; y++) {
              for (let x = 0; x < this.width; x++) {
                let div = document.getElementById(x + " " + y);
                div.innerHTML = "";
              }
            }
          }
        }

        changeTips() {
          if (this.tips.innerText == this.SHOW_TIPS_TEXT) {
            this.tips.innerText = this.HIDE_TIPS_TEXT;
            console.log("Show");
          } else {
            this.tips.innerText = this.SHOW_TIPS_TEXT;
            console.log("Hide");
          }
          this.setTips();
        }

        clickField(x, y, div) {
          this.moves += 1;
          this.counter.innerText = this.COUNTER_TEXT + this.moves;

          this.grid[x][y] ^= true;
          this.answers[x][y] ^= true;

          div.style.backgroundColor = this.getColorByPos(x, y, this.grid[x][y]);

          if (this.tips.innerText == this.HIDE_TIPS_TEXT) {
            if (div.innerHTML == "") {
              div.innerHTML = this.TIPS_SIGN;
            } else {
              div.innerHTML = "";
            }
          }

          if (x - 1 >= 0) {
            this.grid[x - 1][y] ^= true;
            document.getElementById(x - 1 + " " + y).style.backgroundColor =
              this.getColorByPos(x - 1, y, this.grid[x - 1][y]);
          }
          if (x + 1 < this.width) {
            this.grid[x + 1][y] ^= true;
            document.getElementById(x + 1 + " " + y).style.backgroundColor =
              this.getColorByPos(x + 1, y, this.grid[x + 1][y]);
          }
          if (y + 1 < this.height) {
            this.grid[x][y + 1] ^= true;
            document.getElementById(x + " " + (y + 1)).style.backgroundColor =
              this.getColorByPos(x, y + 1, this.grid[x][y + 1]);
          }
          if (y - 1 >= 0) {
            this.grid[x][y - 1] ^= true;
            document.getElementById(x + " " + (y - 1)).style.backgroundColor =
              this.getColorByPos(x, y - 1, this.grid[x][y - 1]);
          }
        }

        initGridLayout() {
          var properties = window.getComputedStyle(this.container, null),
            h = parseInt(properties.height),
            w = parseInt(properties.width);

          const myNode = document.getElementById("container");
          myNode.innerHTML = "";

          for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
              let div = document.createElement("div");
              div.style.width = w / this.width + "px";
              div.style.height = h / this.height + "px";

              div.style.backgroundColor = this.getColorByPos(
                x,
                y,
                this.grid[x][y]
              );
              div.style.fontSize = "20px";
              div.style.textAlign = "center";
              div.style.display = "flex";

              div.style.justifyContent = "center";
              div.style.alignContent = "center";
              div.style.flexDirection = "column";

              let thi = this; // to use class function in clickListenner, there must be better way...

              div.id = x + " " + y;
              div.addEventListener("click", function () {
                console.log("Click " + x + " - " + y);
                thi.clickField(x, y, div);
              });
              div.style.cssFloat = "left";
              this.container.appendChild(div);
            }
          }
        }

        getColorByPos(x, y, g) {
          if (!g) {
            return this.BACK_N;
          }

          if (x % 2 == 0) {
            if (y % 2 == 0) {
              return this.BACK_O;
            } else {
              return this.BACK_E;
            }
          } else {
            if (y % 2 == 1) {
              return this.BACK_O;
            } else {
              return this.BACK_E;
            }
          }
        }
      }

      var app = new App(5, 7);

      function resize() {
        console.log("resize");
        app.initGridLayout();
        app.setTips();
      }
    </script>
  </body>
</html>
`;

var breakoutGameString = `
<!DOCTYPE html>
<html lang="en" id="view">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <title>Breakout</title>

</head>

<style>
    html {
        background-image: linear-gradient(to right, rgb(68, 68, 206), rgb(224, 163, 50));
        text-align: center;
        overflow-y: hidden;
    }

    body {
        text-align: center;
        margin: 0;
    }

    canvas {
        display: block;
        box-sizing: border-box;
        border: 4px rgb(150, 150, 150) solid;
        border-radius: 5px;
        background: #eee;
        width: 100%;
        height: 100%;
        margin: 0;
    }
</style>

<body>
    <canvas id="main_canvas"></canvas>
    <script>
        window.addEventListener("resize", function () {
            // Get screen size (inner/outerWidth, inner/outerHeight)
            location.reload()
        }, false);

        // ----------------------------- PARAMETERS -----------------------------
        var canvas = document.getElementById("main_canvas");
        var context = canvas.getContext("2d");

        // Set size like window size
        canvas.width = innerWidth;
        canvas.height = innerHeight;

        var canvasWidth = canvas.width;
        var canvasHeigth = canvas.height;
        // Ball, ball size and  starting position 
        var sideOffset = 0;
        var topOffset = 0;

        var unit = 0;

        unit = canvasHeigth / 10;
        sideOffset = unit
        unit = (canvasHeigth - 2 * sideOffset) / 10;
        sideOffset = (canvasWidth - (10 * unit)) / 2
        topOffset = sideOffset / 10

        var ballRadius = unit / 5;
        var ballXStartingPosition = canvasWidth / 2;
        var ballYStartingPosition = canvasHeigth - 100;
        var ballXPosition = ballXStartingPosition;
        var ballYPosition = ballYStartingPosition;

        // Ball speed 
        const BALL_SPEED = 5;
        var ballSpeedX = BALL_SPEED;
        var ballSpeedY = -BALL_SPEED;

        // Player size
        var playerHeight = unit / 2;
        var playerWidth = 2 * unit;

        // Parameters for controls (arrow keys)
        var playerPosition = (canvasWidth - playerWidth) / 2;
        var rightPressed = false;
        var leftPressed = false;
        var speed = 5;

        // Board parameters
        var brickAmountRow = 5;
        var brickAmountColumn = 3;
        var brickWidth = 2 * unit;
        var brickHeight = unit;

        var brickPadding = unit / 10;
        // Offsets
        // Board's top offset
        var brickOffsetTop = topOffset;
        // Board's left offset
        var brickOffsetLeft = sideOffset;

        // Game info
        var score = 0;
        var lives = 3;
        var level = 1;

        // Colors
        var brickColors = ["#ff0000", "#ffa500", "#ffff00", "#008000", "#0000ff", "#4b0082", "#ee82ee"];
        var playerColor = "#140507"
        var ballColor = "#140507"
        var scoreAndLivesColor = "#000"
        // ----------------------------------------------------------------------



        var bricks = Array();

        // Set bricks on the level (also color them randomly)
        function setupBricks() {
            let currentColorIndex = Math.floor(Math.random() * brickColors.length);
            let previousColorIndex = currentColorIndex;
            rowRandomColor = brickColors[currentColorIndex];
            for (column = 0; column < brickAmountColumn; column++) {
                bricks[column] = Array();
                for (row = 0; row < brickAmountRow; row++) {
                    bricks[column][row] = {
                        x: 0,
                        y: 0,
                        color: rowRandomColor,
                        notDestroyed: 1
                    };
                }
                currentColorIndex = (previousColorIndex + Math.ceil(Math.random() * (Math.round(brickColors.length / 2) - 1))) % brickColors.length;
                rowRandomColor = brickColors[currentColorIndex];
                previousColorIndex = currentColorIndex;
            }
        }

        // Controls
        document.addEventListener("keydown", keyDown, false);
        document.addEventListener("keyup", keyUp, false);

        function keyDown(e) {
            if (e.key == "Right" || e.key == "ArrowRight" || e.key == "d" || e.key == "D") {
                rightPressed = true;
            }
            else if (e.key == "Left" || e.key == "ArrowLeft" || e.key == "a" || e.key == "A") {
                leftPressed = true;
            }
        }

        function keyUp(e) {
            if (e.key == "Right" || e.key == "ArrowRight" || e.key == "d" || e.key == "D") {
                rightPressed = false;
            }
            else if (e.key == "Left" || e.key == "ArrowLeft" || e.key == "a" || e.key == "A") {
                leftPressed = false;
            }
        }


        // Return true if the rectangle and circle are colliding
        function rectCircleColliding(rect) {
            let distX = Math.abs(ballXPosition - rect.x - brickWidth / 2);
            let distY = Math.abs(ballYPosition - rect.y - brickHeight / 2);

            if (distX > (brickWidth / 2 + ballRadius)) { return false; }
            if (distY > (brickHeight / 2 + ballRadius)) { return false; }

            if (distX <= (brickWidth / 2)) {
                // After collision bounce changes the Y speed (bounce top/bottom)
                ballSpeedY = -ballSpeedY;
                return true;
            }
            if (distY <= (brickHeight / 2)) {
                // After collision bounce changes the X speed (bounce left/right)
                ballSpeedX = -ballSpeedX;
                return true;
            }

            // Check if corner was hit
            let dx = distX - brickWidth / 2;
            let dy = distY - brickHeight / 2;

            if (dx * dx + dy * dy <= (ballRadius * ballRadius)) {
                ballSpeedY = -ballSpeedY;
                ballSpeedX = -ballSpeedX;
                return true;
            }
            else {
                return false;
            }

        }


        function collisionDetection() {
            // Check collsion for every block
            for (var column = 0; column < brickAmountColumn; column++) {
                for (var row = 0; row < brickAmountRow; row++) {
                    var currentBrick = bricks[column][row];
                    if (currentBrick.notDestroyed == 1) {
                        let isItTrue = rectCircleColliding(currentBrick);
                        if (isItTrue) {
                            currentBrick.notDestroyed = 0;
                            score++;
                            // If score = block count then win and load next level
                            if (score == brickAmountRow * brickAmountColumn * level) {
                                loadNewLevel()
                            }
                        }
                    }
                }
            }
        }

        // Displaying functions
        function drawBricks() {
            for (column = 0; column < brickAmountColumn; column++) {
                for (row = 0; row < brickAmountRow; row++) {
                    if (bricks[column][row].notDestroyed == 1) {
                        var brickX = (row * (brickWidth + brickPadding)) + brickOffsetLeft;
                        var brickY = (column * (brickHeight + brickPadding)) + brickOffsetTop;
                        bricks[column][row].x = brickX;
                        bricks[column][row].y = brickY;
                        context.beginPath();
                        context.rect(brickX, brickY, brickWidth, brickHeight);
                        context.fillStyle = bricks[column][row].color;
                        context.fill();
                        context.closePath();
                    }
                }
            }
        }

        function drawBall() {
            context.beginPath();
            context.arc(ballXPosition, ballYPosition, ballRadius, 0, Math.PI * 2);
            context.fillStyle = ballColor;
            context.fill();
            context.closePath();
        }

        function drawPlayer() {
            context.beginPath();
            context.rect(playerPosition, canvasHeigth - playerHeight, playerWidth, playerHeight);
            context.fillStyle = playerColor;
            context.fill();
            context.closePath();
        }


        function drawScore() {
            context.font = "17px Times New Roman";
            context.fillStyle = scoreAndLivesColor;
            context.fillText("Punkty: " + score, 8, 20);
        }

        function drawLives() {
            context.font = "17px Times New Roman";
            context.fillStyle = scoreAndLivesColor;
            context.fillText("Życia: " + lives, canvasWidth - 65, 20);
        }

        // Return true if the rectangle and circle are colliding
        function playerCollision() {
            //console.log("ball pos " + ballXPosition + "ball Y " + ballYPosition + "player pos "+ playerPosition + "weed " + playerWidth + "height " + (canvasHeigth-playerHeight - playerHeight/2));
            let distX = Math.abs(ballXPosition - playerPosition - playerWidth / 2);
            let distY = Math.abs(ballYPosition - (canvasHeigth - playerHeight / 2));
            //console.log(distX + "\t" + distY);

            if (distX > (playerWidth / 2 + ballRadius)) { return false; }
            if (distY > (playerHeight / 2 + ballRadius)) { return false; }
            if (distX <= (playerWidth / 2)) {
                // When player contact on corner bounce was buggy
                // So after collinding just set heigth of ball just above player
                ballYPosition = (canvasHeigth - playerHeight - ballRadius);
                return true;
            }
            if (distY <= (playerHeight / 2)) {
                // When player contact on corner bounce was buggy
                // So after collinding just set heigth of ball just above player
                ballYPosition = (canvasHeigth - playerHeight - ballRadius);
                return true;
            }

            ballYPosition = (canvasHeigth - playerHeight - ballRadius);
            let dx = distX - playerWidth / 2 / 2;
            let dy = distY - playerHeight / 2;
            return (dx * dx + dy * dy <= (ballRadius * ballRadius));
        }

        // Main drawing function
        function drawGame() {
            context.clearRect(0, 0, canvasWidth, canvasHeigth);
            drawBricks();
            drawBall();
            drawPlayer();
            drawScore();
            drawLives();
            collisionDetection();
            let playerCollided = playerCollision();
            // console.log(playerCollided);
            if (ballXPosition + ballSpeedX > canvasWidth - ballRadius || ballXPosition + ballSpeedX < ballRadius) {
                ballSpeedX = -ballSpeedX;
            }
            if (ballYPosition + ballSpeedY < ballRadius) {
                ballSpeedY = -ballSpeedY;
            }
            else if (playerCollided) {
                ballSpeedY = -ballSpeedY;
                playerCollided = false;
            }
            else if (ballYPosition + ballSpeedY > canvasHeigth - ballRadius) {
                ballSpeedY = -ballSpeedY;
                lives--;
                if (!lives) {
                    context.clearRect(0, 0, canvasWidth, canvasHeigth);
                    drawBricks();
                    drawBall();
                    drawPlayer();
                    drawScore();
                    drawLives();
                    collisionDetection();
                    document.location.reload();
                }
                else {
                    ballXPosition = ballXStartingPosition;
                    ballYPosition = ballYStartingPosition;
                    ballSpeedX = BALL_SPEED;
                    ballSpeedY = -BALL_SPEED;
                    playerPosition = (canvasWidth - playerWidth) / 2;
                }
            }

            if (rightPressed && playerPosition < canvasWidth - playerWidth) {
                playerPosition += speed;
            }
            else if (leftPressed && playerPosition > 0) {
                playerPosition -= speed;
            }

            ballXPosition += ballSpeedX;
            ballYPosition += ballSpeedY;
            requestAnimationFrame(drawGame);
        }

        function loadNewLevel() {
            level++;
            ballXPosition = ballXStartingPosition;
            ballYPosition = ballYStartingPosition;
            ballSpeedX = BALL_SPEED;
            ballSpeedY = -BALL_SPEED;
            playerPosition = (canvasWidth - playerWidth) / 2;
            setupBricks();
            context.clearRect(0, 0, canvasWidth, canvasHeigth);
            drawBricks();
            drawBall();
            drawPlayer();
            drawScore();
            drawLives();
            collisionDetection();
        }

        setupBricks();
        drawGame();
    </script>
</body>

</html>
`;

function getGame(gameId) {
  console.log("Loading game with id: " + gameId);

  // w tym miejscu gra z `id` powinna zostac pobrana z API
  // TODO
  var loadedGame = contentFromApiTEST; // logic here

  $("#inserted").html(loadedGame);
}

(function () {
  var url_string = window.location.href;
  var url = new URL(url_string);
  var id = url.searchParams.get("gameId");
  var name = url.searchParams.get("name");
  console.log("Id = " + id + "; Name = " + name);
  document.title = name;
  getGame(id);
})();

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

const games = document.querySelectorAll(".game");

games.forEach((el) => {
  el.addEventListener("click", (event) => {
    // TODO Feature flagi do usunięcia
    if (el.id != "gameId=4&name=Memory" && el.id != "gameId=5&name=Puzzle") {
      params = el.id;
      location.href = "game.html?" + params;
    }
  });

  var dIcon = el.getElementsByClassName("downloadIcon")[0];
  el.onmouseover = function () {
    dIcon.style.visibility = "visible";
  };
  el.onmouseleave = function () {
    dIcon.style.visibility = "hidden";
  };

  dIcon.addEventListener("click", (event) => {
    var re = new RegExp("gameId=([0-9]*)&name=([a-zA-Z0-9 ]*)");
    var match = re.exec(el.id);
    downloadGame(match[1], match[2]);
    event.stopPropagation();
  });
});

function downloadGame(gameId, name) {
  // TODO Feature flagi do usunięcia
  if (gameId == 1 || gameId == 2 || gameId == 3) {
    console.log("Download game with id " + gameId);
    var h = httpGet(ulrs[gameId]);
    var blob = new Blob([h], { type: "text/plain;charset=utf-8" });
    saveAs(blob, name + ".html");
  }
}

function showHelp() {
  console.log("Show help");
  Swal.fire({
    icon: "info",
    confirmButtonColor: "#3085d6",
  });

  Swal.fire({
    title: "Help and Info",
    text: "Tutaj niech ktoś coś wymyśli...  It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for lorem ipsum will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    width: 600,
    padding: "1em",
    confirmButtonColor: "#3085d6",
    background: "#fff url(img/trees.png)",
    backdrop: `
      rgba(0,0,0,0.6)
      url("img/help.gif")
      left top
      no-repeat
    `,
  });
}

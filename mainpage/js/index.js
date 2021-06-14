const games = document.querySelectorAll(".game");

games.forEach((el) => {
  el.addEventListener("click", (event) => {
    // TODO Feature flagi do usunięcia
    // if (el.id != "gameId=4&name=Memory") {
      
    // }
    params = el.id;
    location.href = "game.html?" + params;
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
  if (gameId == 1 || gameId == 2 || gameId == 3 || gameId == 5) {
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
    text: "Witam w naszym Game Room! Oddajemy w twoje ręce najprawdziwszy salon gier. Instrukcja obsługi\n: Wybierz dowolną grę w którą chcesz zagrać, następnie kliknij ją. Zostaniesz przekierowany do wybranej gry, możesz teraz w nią zagrać. Aby się cofnąć po prostu użyj przycisku z przeglądarki do cofnięcia się do poprzedniej strony. Dodatkowo masz możliwość pobrania dowolnej gry, za pomocą przycisku pobierania. Da ci to możliwość zagrania w grę w trybie offline.",
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

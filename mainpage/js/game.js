// TODO uzupełnić linki
// id game: url gry
var ulrs = {
  1: 'https://raw.githubusercontent.com/N-janas/Game-rooms/main/games/breakout.txt',
  2: 'https://raw.githubusercontent.com/N-janas/Game-rooms/main/games/lights_out.txt',
  3: '',
  4: '',
  5: '',
};

function httpGet(theUrl) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", theUrl, false);
  xmlHttp.send(null);
  return xmlHttp.responseText;
}

function getGame(gameId) {
  console.log("Loading game with id: " + gameId);
  var loadedGame = httpGet(ulrs[gameId]);

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

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

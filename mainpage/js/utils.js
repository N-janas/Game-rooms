var ulrs = {
    1: 'https://raw.githubusercontent.com/N-janas/Game-rooms/main/games/breakout.txt',
    2: 'https://raw.githubusercontent.com/N-janas/Game-rooms/main/games/lights_out.txt',
    3: 'https://raw.githubusercontent.com/N-janas/Game-rooms/main/games/nasapuzzle.txt',
    4: '',
    5: 'https://raw.githubusercontent.com/N-janas/Game-rooms/main/games/puzzle.txt',
  };
  
  function httpGet(theUrl) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false);
    xmlHttp.send(null);
    return xmlHttp.responseText;
  }
let socket = io("http://localhost:8080");

function init() {
  //console.log("ran the init!", orbs);
  draw();
  socket.emit("init", { playerName: player.name });
}

socket.on("init-response", (data) => {
  orbs = data.orbs;
  // console.log("got data", data);
  setInterval(() => {
    socket.emit("tick", { xVector: player.xVector, yVector: player.yVector });
  }, 33);
});

socket.on("tock", (data) => {
  allPlayerData = data.allPlayerData;
});
socket.on("player-pos", (data) => {
  player.posX = data.clientPosX;
  player.posY = data.clientPosY;
});

socket.on("orb-collision", (data) => {
  orbs.splice(data.orbIndex, 1, data.newOrb);
});
socket.on("update-leaderboard", (data) => {
  console.log("data!!", data);
  document.querySelector(".leader-board").innerHTML = "";
  data.forEach((currPlayer) => {
    document.querySelector(
      ".leader-board"
    ).innerHTML += `<li class="leaderboard-player">${currPlayer.name} -${currPlayer.score} </li>`;
  });
});

let socket = io("http://localhost:8080");
console.log("socket info", socket, io);

function init() {
  //console.log("ran the init!", orbs);
  draw();
  socket.emit("init", { playerName: player.name });
}

socket.on("init-response", (data) => {
  orbs = data.orbs;
  // console.log("got data", data);
});

socket.on("tock", (data) => {
  console.log("tock", data);
  allPlayerData = data.allPlayerData;
});

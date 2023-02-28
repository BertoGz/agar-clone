// where all the main socket stuff go
const { io } = require("../servers");
const Orb = require("./classes/Orb");
const Player = require("./classes/Player");
const PlayerConfig = require("./classes/PlayerConfig");
const PlayerData = require("./classes/PlayerData");
console.log("io", io);
let orbs = [];
let allPlayerData = [];
let settings = {
  defaultOrbsCount: 500,
  defaultSpeed: 1,
  defaultOrbSize: 6,
  defaultZoom: 1.5,
  worldSize: 500,
};
function initOrbs() {
  // 500 orbs
  for (let i = 0; i < settings.defaultOrbsCount; i++) {
    orbs.push(new Orb(settings));
  }
}
initOrbs();
// when io sees a socket connection we will broadcast the orbs

//issue a message every 30 secs
// there are 30 33s in 1000ms
setInterval(() => {
  io.to("game-name-space").emit("tock", { allPlayerData });
}, 33);

io.on("connect", (socket) => {
  socket.on("init", (payload) => {
    const { playerName } = payload || {};
    socket.join("game-name-space");
    console.log("a socket connected", socket.id);
    let playerConfig = new PlayerConfig(settings);
    let playerData = new PlayerData(playerName, settings);
    let player = new Player(socket.io, playerConfig, playerData);
    socket.emit("init-response", { orbs });
    allPlayerData.push(playerData);
  });
});
module.exports = io;

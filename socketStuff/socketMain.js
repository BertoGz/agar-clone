// where all the main socket stuff go
const { io } = require("../servers");
const Orb = require("./classes/Orb");
const Player = require("./classes/Player");
const PlayerConfig = require("./classes/PlayerConfig");
const PlayerData = require("./classes/PlayerData");
const {
  checkForOrbCollisions,
  checkForPlayerCollisions,
} = require("./checkCollision");
let orbs = [];
let allPlayerData = [];
let settings = {
  defaultOrbsCount: 50,
  defaultSpeed: 5,
  defaultOrbRadius: 6,
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
setInterval(() => {
  if (allPlayerData.length > 0) {
    io.to("game-name-space").emit("tock", {
      allPlayerData,
    });
  }
}, 33);
io.on("connect", (socket) => {
  let player = {};
  socket.on("init", (payload) => {
    const { playerName } = payload || {};
    socket.join("game-name-space");
    console.log("a socket connected", socket.id);
    let playerConfig = new PlayerConfig(settings);
    let playerData = new PlayerData(playerName, settings);
    player = new Player(socket.io, playerConfig, playerData);

    setInterval(() => {
      socket.emit("player-pos", {
        clientPosX: player.playerData.posX,
        clientPosY: player.playerData.posY,
      });
    }, 33);

    socket.emit("init-response", { orbs });
    allPlayerData.push(playerData);
  });
  socket.on("tick", (data) => {
    const { xVector, yVector } = data || {};
    if (!player?.playerConfig) {
      return;
    }
    speed = player.playerConfig.speed;
    xV = player.playerConfig.xVector = xVector;
    yV = player.playerConfig.yVector = yVector;
    // update player pos
    if (
      (player.playerData.posX < 5 && xV < 0) ||
      (player.playerData.posX > settings.worldSize && xV > 0)
    ) {
      player.playerData.posY -= speed * yV;
    } else if (
      (player.playerData.posY < 5 && yV > 0) ||
      (player.playerData.posY > settings.worldSize && yV < 0)
    ) {
      player.playerData.posX += speed * xV;
    } else {
      player.playerData.posX += speed * xV;
      player.playerData.posY -= speed * yV;
    }

    let capturedOrb = checkForOrbCollisions(
      player.playerData,
      player.playerConfig,
      orbs,
      settings
    );
    capturedOrb
      .then((d) => {
        // run if collision happened
        // returns captured orb index
        const orbData = {
          orbIndex: d,
          newOrb: orbs[d],
        };
        // emit to clients about this
        socket.emit("orb-collision", orbData);
        socket.emit("update-leaderboard", {
          leaderboard: getLeaderBoard(),
          myScore: player.playerData.score,
        });
      })
      .catch((d) => {});
    let playerDeath = checkForPlayerCollisions(
      player.playerData,
      player.playerConfig,
      allPlayerData,
      player.socketId
    );
    playerDeath
      .then((data) => {
        console.log("a player collision!", data);
        socket.emit("update-leaderboard", {
          leaderboard: getLeaderBoard(),
          myScore: player.playerData.score,
        });
      })
      .catch(() => {});
  });
});
function getLeaderBoard() {
  // sort player array by score
  allPlayerData.sort((a, b) => {
    return b.score - a.score;
  });
  let leaderboard = allPlayerData.map((currPlayer) => {
    return { name: currPlayer.playerName, score: currPlayer.score };
  });
  return leaderboard;
}
module.exports = io;

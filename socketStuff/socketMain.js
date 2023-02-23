// where all the main socket stuff go
const { io } = require("../servers");
const Orb = require("./classes/Orb");

let orbs = [];
function initOrbs() {
  // 500 orbs
  for (let i = 0; i < 500; i++) {
    orbs.push(new Orb());
  }
}
initOrbs();
// when io sees a socket connection we will broadcast the orbs
io.sockets.on("connect", (socket) => {
  socket.emit("init", { orbs });
});
module.exports = io;

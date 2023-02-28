const { v4: uuidv4 } = require('uuid');
// data about the position, name, and color of player
class PlayerData {
  constructor(playerName, settings) {
    this.uid = uuidv4();
    this.playerName = playerName;
    this.posX = Math.floor(Math.random() * settings.worldSize + 10);
    this.posY = Math.floor(Math.random() * settings.worldSize + 10);
    this.orbRadius = settings.defaultOrbRadius;
    this.color = this.getRandomColor();
    this.score = 0;
    this.orbsAbsorbed = 0;
  }
  getRandomColor() {
    const randColor = () => Math.floor(Math.random() * 255);
    return `rgb(${randColor()},${randColor()},${randColor()})`;
  }
}
module.exports = PlayerData;

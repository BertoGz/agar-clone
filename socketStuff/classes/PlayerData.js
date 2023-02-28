// data about the position, name, and color of player
class PlayerData {
  constructor(playerName, settings) {
    this.playerName = playerName;
    this.posX = Math.floor(Math.random() * settings.worldSize + 10);
    this.posY = Math.floor(Math.random() * settings.worldSize + 10);
    this.orbRadius = settings.defaultOrbRadius;
    this.color = this.getRandomColor();
  }
  getRandomColor() {
    const randColor = () => Math.floor(Math.random() * 255);
    return `rgb(${randColor()},${randColor()},${randColor()})`;
  }
}
module.exports = PlayerData;
 
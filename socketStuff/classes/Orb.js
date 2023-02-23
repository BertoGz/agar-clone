const { WORLD_SIZE } = require("../../Constants");

function getRandomColor() {
  const randColor = () => Math.floor(Math.random() * 255);
  return `rgb(${randColor()},${randColor()},${randColor()})`;
}
class Orb {
  constructor() {
    this.color = getRandomColor();
    this.posX = Math.floor(Math.random() * WORLD_SIZE);
    this.posY = Math.floor(Math.random() * WORLD_SIZE);
    this.radius = 5;
  }
}
module.exports = Orb;

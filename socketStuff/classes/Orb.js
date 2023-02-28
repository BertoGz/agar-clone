function getRandomColor() {
  const randColor = () => Math.floor(Math.random() * 255);
  return `rgb(${randColor()},${randColor()},${randColor()})`;
}
class Orb {
  constructor(settings) {
    this.color = getRandomColor();
    this.posX = Math.floor(Math.random() * settings.worldSize);
    this.posY = Math.floor(Math.random() * settings.worldSize);
    this.radius = 5;
  }
}
module.exports = Orb;
    
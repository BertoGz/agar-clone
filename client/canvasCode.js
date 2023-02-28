const WORLD_SIZE = 500;
const PORT = 8080;

let mousePosition = { x: 0, y: 0 };

function draw() {
  //clear screen
  context.setTransform(1, 0, 0, 1, 0, 0);
  context.clearRect(0, 0, canvas.width, canvas.height);

  //clamp camera to player
  const camX = -player.posX + canvas.width / 2;
  const camY = -player.posY + canvas.height / 2;
  context.translate(camX, camY);

  allPlayerData.forEach((p) => {
    // draw player circle
    context.beginPath();
    context.fillStyle = p.color; // fill red
    context.arc(p.posX, p.posY, p.orbRadius, 0, 2 * Math.PI);
    context.fill();
    context.lineWidth = 3;
    context.strokeStyle = "rgb(0,255,0)";
    context.stroke();
  });

  orbs.forEach((orb) => {
    context.beginPath();
    context.fillStyle = orb.color;
    context.arc(orb.posX, orb.posY, orb.orbRadius, 0, 2 * Math.PI);
    context.fill();
  });

  movePlayer();
  requestAnimationFrame(draw); //recursively calls self
}

canvas.addEventListener("mousemove", (event) => {
  // console.log(event);
  mousePosition = {
    x: event.clientX,
    y: event.clientY,
  };
});

function movePlayer() {
  const angleDeg =
    (Math.atan2(
      mousePosition.y - canvas.height / 2,
      mousePosition.x - canvas.width / 2
    ) *
      180) /
    Math.PI;
  if (angleDeg >= 0 && angleDeg < 90) {
    xVector = 1 - angleDeg / 90;
    yVector = -(angleDeg / 90);
  } else if (angleDeg >= 90 && angleDeg <= 180) {
    xVector = -(angleDeg - 90) / 90;
    yVector = -(1 - (angleDeg - 90) / 90);
  } else if (angleDeg >= -180 && angleDeg < -90) {
    xVector = (angleDeg + 90) / 90;
    yVector = 1 + (angleDeg + 90) / 90;
  } else if (angleDeg < 0 && angleDeg >= -90) {
    xVector = (angleDeg + 90) / 90;
    yVector = 1 - (angleDeg + 90) / 90;
  }

  player.xVector = xVector;
  player.yVector = yVector;
}

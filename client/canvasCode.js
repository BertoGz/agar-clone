const WORLD_SIZE = 500;
const PORT = 8080;

let mousePosition = {};
function init() {
  console.log("ran init caca!");
  draw();
}
player.posX = Math.floor(Math.random() * WORLD_SIZE + 10);
player.posY = Math.floor(Math.random() * WORLD_SIZE + 10);
function draw() {
  //clear screen
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.setTransform(1, 0, 0, 1, 0, 0);
  //clamp camera to player
  const camX = -player.posX + canvas.width / 2;
  const camY = -player.posY + canvas.height / 2;
  context.translate(camX, camY);
  context.beginPath();
  // draw player circle
  context.fillStyle = "rgb(255,0,0)"; // fill red

  context.arc(player.posX, player.posY, 10, 0, 2 * Math.PI);
  context.arc(200, 200, 10, 0, 2 * Math.PI);
  context.fill();
  context.lineWidth = 3;
  context.strokeStyle = "rgb(0,255,0)";
  context.stroke();
  requestAnimationFrame(draw); //recursively calls self
  movePlayer();
}

canvas.addEventListener("mousemove", (event) => {
  console.log(event);
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

  speed = 1;
  xV = xVector;
  yV = yVector;

  // update player pos
  if (
    (player.posX < 5 && player.xVector < 0) ||
    (player.posX > WORLD_SIZE && xV > 0)
  ) {
    player.posY -= speed * yV;
  } else if (
    (player.posY < 5 && yV > 0) ||
    (player.posY > WORLD_SIZE && yV < 0)
  ) {
    player.posX += speed * xV;
  } else {
    player.posX += speed * xV;
    player.posY -= speed * yV;
  }
}

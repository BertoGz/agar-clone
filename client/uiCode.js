console.log("!check!");
let wHeight = window.innerHeight;
let wWidth = window.innerWidth;
let canvas = document.querySelector("#the-canvas");
let context = canvas.getContext("2d");
let player = {}; // this is all things player
let orbs = []
let allPlayerData = []
canvas.width = wWidth;
canvas.height = wHeight;

$(window).load(() => {
  $("#loginModal").modal("show");
});
// name-form submit listener
$(".name-form").submit((event) => {
  event.preventDefault();
  console.log("submitted");
  player.name = document.querySelector("#name-input").value;
  $("#loginModal").modal("hide");
  $("#spawnModal").modal("show");
  document.querySelector(".player-name").innerHTML = player.name;
});

$(".start-game").click(() => {
  $(".modal").modal("hide");
  document.querySelector(".hiddenOnStart").removeAttribute("hidden");
  //$(".hiddenOnStart").removeAttr("hidden");
  init();
});

const { moveAirPlane } = require("./functions/airplaneFunctions.js");
const {
  gameContainer,
  onColideShotWithEnemy,
  onMouseClickShot,
} = require("./functions/playFunctions.js");

window.addEventListener("load", () => {
  document.body.classList.add("scrolling");
});

gameContainer.addEventListener("mousemove", moveAirPlane);

gameContainer.addEventListener("collision", onColideShotWithEnemy);
gameContainer.addEventListener("mousedown", onMouseClickShot);

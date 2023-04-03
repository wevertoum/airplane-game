const { gameContainer, gamePlayer } = require("./contants");

const playShotSound = () => {
  const audioShot = new Audio("assets/sounds/player_shot.wav");
  audioShot.play();
};

const playShotBoomSound = () => {
  const audioShot = new Audio("assets/sounds/enemy_boom.wav");
  audioShot.play();
};

const moveAirPlane = (e) => {
  const x = e.clientX - gameContainer.offsetLeft;
  const y = e.clientY - gameContainer.offsetTop;
  gamePlayer.style.left = x - gamePlayer.offsetWidth / 2 + "px";
  gamePlayer.style.top = y - gamePlayer.offsetHeight / 2 + 20 + "px";
};

module.exports = {
  playShotSound,
  playShotBoomSound,
  moveAirPlane,
};

const playShotSound = () => {
  const audioShot = new Audio("assets/sounds/player_shot.wav");
  audioShot.play();
};

const playShotBoomSound = () => {
  const audioShot = new Audio("assets/sounds/enemy_boom.wav");
  audioShot.play();
};

module.exports = {
  playShotSound,
  playShotBoomSound,
};

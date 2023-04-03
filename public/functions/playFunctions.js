const { playShotSound, playShotBoomSound } = require("./airplaneFunctions.js");
const { gameContainer, gamePlayer, welcomeMessage } = require("./contants.js");
const { startCreatingEnemies } = require("./enemiesFuncions.js");
let isGameStarted = false;

const onColideShotWithEnemy = (e) => {
  const laser = e.detail.laser;
  const enemy = e.detail.enemy;
  gameContainer.removeChild(enemy);
  gameContainer.removeChild(laser);
};

function checkCollision(laser, enemy) {
  const laserRect = laser.getBoundingClientRect();
  const enemyRect = enemy.getBoundingClientRect();
  return !(
    laserRect.right < enemyRect.left ||
    laserRect.left > enemyRect.right ||
    laserRect.bottom < enemyRect.top ||
    laserRect.top > enemyRect.bottom
  );
}

function createExplosion(x, y) {
  playShotBoomSound();
  const explosion = document.createElement("img");
  explosion.src = "assets/images/explosion.gif";
  explosion.className = "explosion";
  explosion.style.width = "fit-content";
  explosion.style.height = "80px";
  explosion.style.left = x + 40 + "px";
  explosion.style.top = y + "px";

  gameContainer.appendChild(explosion);

  setTimeout(() => {
    gameContainer.removeChild(explosion);
  }, 1000);
}

const onMouseClickShot = () => {
  if (!isGameStarted) {
    startCreatingEnemies();
    const body = document.querySelector("body");
    welcomeMessage.remove();
    body.classList.add("start-animation");
    isGameStarted = true;
  }

  playShotSound();

  const laser = document.createElement("div");
  laser.classList.add("laser");
  laser.style.left =
    gamePlayer.offsetLeft + gamePlayer.offsetWidth / 2 - 15 + "px";
  laser.style.top = gamePlayer.offsetTop + 40 + "px";
  gameContainer.appendChild(laser);

  const laserInterval = setInterval(() => {
    laser.style.top = parseInt(laser.style.top) - 10 + "px";
    if (laser.offsetTop < 0) {
      clearInterval(laserInterval);
      gameContainer.removeChild(laser);
    } else {
      const enemies = document.querySelectorAll(".enemy");
      if (enemies.length > 0) {
        enemies.forEach((enemy) => {
          if (checkCollision(laser, enemy)) {
            const collisionEvent = new CustomEvent("collision", {
              detail: { laser, enemy },
            });
            createExplosion(enemy.offsetLeft, enemy.offsetTop);
            gameContainer.dispatchEvent(collisionEvent);
          }
        });
      }
    }
  }, 10);

  laser.style.transform = "rotate(90deg)";
};

module.exports = {
  gameContainer,
  onColideShotWithEnemy,
  onMouseClickShot,
};

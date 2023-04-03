const airplaneFunctions = require("./functions/airplaneFunctions.js");

const player = document.getElementById("player");
const container = document.getElementById("game-container");
const welcomeMessage = document.getElementById("welcome-message");
let isGameStarted = false;
let numEnemiesReachedBase = 0;

window.addEventListener("load", () => {
  document.body.classList.add("scrolling");
});

container.addEventListener("mousemove", (e) => {
  const x = e.clientX - container.offsetLeft;
  const y = e.clientY - container.offsetTop;

  player.style.left = x - player.offsetWidth / 2 + "px";
  player.style.top = y - player.offsetHeight / 2 + 20 + "px";
});

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
  airplaneFunctions.playShotBoomSound();
  const explosion = document.createElement("img");
  explosion.src = "assets/images/explosion.gif";
  explosion.className = "explosion";
  explosion.style.width = "fit-content";
  explosion.style.height = "80px";
  explosion.style.left = x + 40 + "px";
  explosion.style.top = y + "px";

  container.appendChild(explosion);

  setTimeout(() => {
    container.removeChild(explosion);
  }, 1000);
}

container.addEventListener("collision", (e) => {
  const laser = e.detail.laser;
  const enemy = e.detail.enemy;
  container.removeChild(enemy);
  container.removeChild(laser);
});

function startCreateEnemies() {
  setInterval(() => {
    const enemy = document.createElement("img");
    enemy.classList.add("enemy");
    enemy.src = "assets/images/enemy_ovni.png";
    enemy.style.width = "fit-content";
    enemy.style.height = "80px";
    enemy.style.left = Math.random() * window.innerWidth + "px";
    enemy.style.top = "-100px";
    container.appendChild(enemy);

    function updateEnemy() {
      let top = parseInt(enemy.style.top);
      top += 2;
      enemy.style.top = top + "px";

      if (top > window.innerHeight) {
        container.removeChild(enemy);
        cancelAnimationFrame(animationId);
      } else {
        animationId = requestAnimationFrame(updateEnemy);
      }
    }

    let animationId = requestAnimationFrame(updateEnemy);
  }, 1000);
}

function startCreatingEnemies() {
  setTimeout(() => {
    startCreateEnemies();
  }, 1000);
}

console.log("estou aqui no client side script");

container.addEventListener("mousedown", (e) => {
  console.log("estou aqui no mousedown");
  if (!isGameStarted) {
    startCreatingEnemies();
    const body = document.querySelector("body");
    welcomeMessage.remove();
    body.classList.add("start-animation");
    isGameStarted = true;
  }

  airplaneFunctions.playShotSound();

  const laser = document.createElement("div");
  laser.classList.add("laser");
  laser.style.left = player.offsetLeft + player.offsetWidth / 2 - 15 + "px";
  laser.style.top = player.offsetTop + 40 + "px";
  container.appendChild(laser);

  const laserInterval = setInterval(() => {
    laser.style.top = parseInt(laser.style.top) - 10 + "px";
    if (laser.offsetTop < 0) {
      clearInterval(laserInterval);
      container.removeChild(laser);
    } else {
      const enemies = document.querySelectorAll(".enemy");
      if (enemies.length > 0) {
        enemies.forEach((enemy) => {
          if (checkCollision(laser, enemy)) {
            const collisionEvent = new CustomEvent("collision", {
              detail: { laser, enemy },
            });
            createExplosion(enemy.offsetLeft, enemy.offsetTop);
            container.dispatchEvent(collisionEvent);
          }
        });
      }
    }
  }, 10);

  laser.style.transform = "rotate(90deg)";
});

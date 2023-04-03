const { gameContainer } = require("./contants");

const startCreateEnemies = () => {
  setInterval(() => {
    const enemy = document.createElement("img");
    enemy.classList.add("enemy");
    enemy.src = "assets/images/enemy_ovni.png";
    enemy.style.width = "fit-content";
    enemy.style.height = "80px";
    enemy.style.left = Math.random() * window.innerWidth + "px";
    enemy.style.top = "-100px";
    gameContainer.appendChild(enemy);

    function updateEnemy() {
      let top = parseInt(enemy.style.top);
      top += 2;
      enemy.style.top = top + "px";

      if (top > window.innerHeight) {
        gameContainer.removeChild(enemy);
        cancelAnimationFrame(animationId);
      } else {
        animationId = requestAnimationFrame(updateEnemy);
      }
    }

    let animationId = requestAnimationFrame(updateEnemy);
  }, 1000);
};

const startCreatingEnemies = () => {
  setTimeout(() => {
    startCreateEnemies();
  }, 1000);
};

module.exports = {
  startCreatingEnemies,
};

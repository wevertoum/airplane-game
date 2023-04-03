/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./public/functions/airplaneFunctions.js":
/*!***********************************************!*\
  !*** ./public/functions/airplaneFunctions.js ***!
  \***********************************************/
/***/ ((module) => {

eval("const playShotSound = () => {\n  const audioShot = new Audio(\"assets/sounds/player_shot.wav\");\n  audioShot.play();\n};\n\nconst playShotBoomSound = () => {\n  const audioShot = new Audio(\"assets/sounds/enemy_boom.wav\");\n  audioShot.play();\n};\n\nmodule.exports = {\n  playShotSound,\n  playShotBoomSound,\n};\n\n\n//# sourceURL=webpack://flight-game/./public/functions/airplaneFunctions.js?");

/***/ }),

/***/ "./public/script.js":
/*!**************************!*\
  !*** ./public/script.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const airplaneFunctions = __webpack_require__(/*! ./functions/airplaneFunctions.js */ \"./public/functions/airplaneFunctions.js\");\n\nconst player = document.getElementById(\"player\");\nconst container = document.getElementById(\"game-container\");\nconst welcomeMessage = document.getElementById(\"welcome-message\");\nlet isGameStarted = false;\nlet numEnemiesReachedBase = 0;\n\nwindow.addEventListener(\"load\", () => {\n  document.body.classList.add(\"scrolling\");\n});\n\ncontainer.addEventListener(\"mousemove\", (e) => {\n  const x = e.clientX - container.offsetLeft;\n  const y = e.clientY - container.offsetTop;\n\n  player.style.left = x - player.offsetWidth / 2 + \"px\";\n  player.style.top = y - player.offsetHeight / 2 + 20 + \"px\";\n});\n\nfunction checkCollision(laser, enemy) {\n  const laserRect = laser.getBoundingClientRect();\n  const enemyRect = enemy.getBoundingClientRect();\n  return !(\n    laserRect.right < enemyRect.left ||\n    laserRect.left > enemyRect.right ||\n    laserRect.bottom < enemyRect.top ||\n    laserRect.top > enemyRect.bottom\n  );\n}\n\nfunction createExplosion(x, y) {\n  airplaneFunctions.playShotBoomSound();\n  const explosion = document.createElement(\"img\");\n  explosion.src = \"assets/images/explosion.gif\";\n  explosion.className = \"explosion\";\n  explosion.style.width = \"fit-content\";\n  explosion.style.height = \"80px\";\n  explosion.style.left = x + 40 + \"px\";\n  explosion.style.top = y + \"px\";\n\n  container.appendChild(explosion);\n\n  setTimeout(() => {\n    container.removeChild(explosion);\n  }, 1000);\n}\n\ncontainer.addEventListener(\"collision\", (e) => {\n  const laser = e.detail.laser;\n  const enemy = e.detail.enemy;\n  container.removeChild(enemy);\n  container.removeChild(laser);\n});\n\nfunction startCreateEnemies() {\n  setInterval(() => {\n    const enemy = document.createElement(\"img\");\n    enemy.classList.add(\"enemy\");\n    enemy.src = \"assets/images/enemy_ovni.png\";\n    enemy.style.width = \"fit-content\";\n    enemy.style.height = \"80px\";\n    enemy.style.left = Math.random() * window.innerWidth + \"px\";\n    enemy.style.top = \"-100px\";\n    container.appendChild(enemy);\n\n    function updateEnemy() {\n      let top = parseInt(enemy.style.top);\n      top += 2;\n      enemy.style.top = top + \"px\";\n\n      if (top > window.innerHeight) {\n        container.removeChild(enemy);\n        cancelAnimationFrame(animationId);\n      } else {\n        animationId = requestAnimationFrame(updateEnemy);\n      }\n    }\n\n    let animationId = requestAnimationFrame(updateEnemy);\n  }, 1000);\n}\n\nfunction startCreatingEnemies() {\n  setTimeout(() => {\n    startCreateEnemies();\n  }, 1000);\n}\n\nconsole.log(\"estou aqui no client side script\");\n\ncontainer.addEventListener(\"mousedown\", (e) => {\n  console.log(\"estou aqui no mousedown\");\n  if (!isGameStarted) {\n    startCreatingEnemies();\n    const body = document.querySelector(\"body\");\n    welcomeMessage.remove();\n    body.classList.add(\"start-animation\");\n    isGameStarted = true;\n  }\n\n  airplaneFunctions.playShotSound();\n\n  const laser = document.createElement(\"div\");\n  laser.classList.add(\"laser\");\n  laser.style.left = player.offsetLeft + player.offsetWidth / 2 - 15 + \"px\";\n  laser.style.top = player.offsetTop + 40 + \"px\";\n  container.appendChild(laser);\n\n  const laserInterval = setInterval(() => {\n    laser.style.top = parseInt(laser.style.top) - 10 + \"px\";\n    if (laser.offsetTop < 0) {\n      clearInterval(laserInterval);\n      container.removeChild(laser);\n    } else {\n      const enemies = document.querySelectorAll(\".enemy\");\n      if (enemies.length > 0) {\n        enemies.forEach((enemy) => {\n          if (checkCollision(laser, enemy)) {\n            const collisionEvent = new CustomEvent(\"collision\", {\n              detail: { laser, enemy },\n            });\n            createExplosion(enemy.offsetLeft, enemy.offsetTop);\n            container.dispatchEvent(collisionEvent);\n          }\n        });\n      }\n    }\n  }, 10);\n\n  laser.style.transform = \"rotate(90deg)\";\n});\n\n\n//# sourceURL=webpack://flight-game/./public/script.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./public/script.js");
/******/ 	
/******/ })()
;
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
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const { gameContainer, gamePlayer } = __webpack_require__(/*! ./contants */ \"./public/functions/contants.js\");\n\nconst playShotSound = () => {\n  const audioShot = new Audio(\"assets/sounds/player_shot.wav\");\n  audioShot.play();\n};\n\nconst playShotBoomSound = () => {\n  const audioShot = new Audio(\"assets/sounds/enemy_boom.wav\");\n  audioShot.play();\n};\n\nconst moveAirPlane = (e) => {\n  const x = e.clientX - gameContainer.offsetLeft;\n  const y = e.clientY - gameContainer.offsetTop;\n  gamePlayer.style.left = x - gamePlayer.offsetWidth / 2 + \"px\";\n  gamePlayer.style.top = y - gamePlayer.offsetHeight / 2 + 20 + \"px\";\n};\n\nmodule.exports = {\n  playShotSound,\n  playShotBoomSound,\n  moveAirPlane,\n};\n\n\n//# sourceURL=webpack://flight-game/./public/functions/airplaneFunctions.js?");

/***/ }),

/***/ "./public/functions/contants.js":
/*!**************************************!*\
  !*** ./public/functions/contants.js ***!
  \**************************************/
/***/ ((module) => {

eval("const gameContainer = document.getElementById(\"game-container\");\nconst gamePlayer = document.getElementById(\"player\");\nconst welcomeMessage = document.getElementById(\"welcome-message\");\nmodule.exports = {\n  gameContainer,\n  gamePlayer,\n  welcomeMessage,\n};\n\n\n//# sourceURL=webpack://flight-game/./public/functions/contants.js?");

/***/ }),

/***/ "./public/functions/enemiesFuncions.js":
/*!*********************************************!*\
  !*** ./public/functions/enemiesFuncions.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const { gameContainer } = __webpack_require__(/*! ./contants */ \"./public/functions/contants.js\");\n\nconst startCreateEnemies = () => {\n  setInterval(() => {\n    const enemy = document.createElement(\"img\");\n    enemy.classList.add(\"enemy\");\n    enemy.src = \"assets/images/enemy_ovni.png\";\n    enemy.style.width = \"fit-content\";\n    enemy.style.height = \"80px\";\n    enemy.style.left = Math.random() * window.innerWidth + \"px\";\n    enemy.style.top = \"-100px\";\n    gameContainer.appendChild(enemy);\n\n    function updateEnemy() {\n      let top = parseInt(enemy.style.top);\n      top += 2;\n      enemy.style.top = top + \"px\";\n\n      if (top > window.innerHeight) {\n        gameContainer.removeChild(enemy);\n        cancelAnimationFrame(animationId);\n      } else {\n        animationId = requestAnimationFrame(updateEnemy);\n      }\n    }\n\n    let animationId = requestAnimationFrame(updateEnemy);\n  }, 1000);\n};\n\nconst startCreatingEnemies = () => {\n  setTimeout(() => {\n    startCreateEnemies();\n  }, 1000);\n};\n\nmodule.exports = {\n  startCreatingEnemies,\n};\n\n\n//# sourceURL=webpack://flight-game/./public/functions/enemiesFuncions.js?");

/***/ }),

/***/ "./public/functions/playFunctions.js":
/*!*******************************************!*\
  !*** ./public/functions/playFunctions.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const { playShotSound, playShotBoomSound } = __webpack_require__(/*! ./airplaneFunctions.js */ \"./public/functions/airplaneFunctions.js\");\nconst { gameContainer, gamePlayer, welcomeMessage } = __webpack_require__(/*! ./contants.js */ \"./public/functions/contants.js\");\nconst { startCreatingEnemies } = __webpack_require__(/*! ./enemiesFuncions.js */ \"./public/functions/enemiesFuncions.js\");\nlet isGameStarted = false;\n\nconst onColideShotWithEnemy = (e) => {\n  const laser = e.detail.laser;\n  const enemy = e.detail.enemy;\n  gameContainer.removeChild(enemy);\n  gameContainer.removeChild(laser);\n};\n\nfunction checkCollision(laser, enemy) {\n  const laserRect = laser.getBoundingClientRect();\n  const enemyRect = enemy.getBoundingClientRect();\n  return !(\n    laserRect.right < enemyRect.left ||\n    laserRect.left > enemyRect.right ||\n    laserRect.bottom < enemyRect.top ||\n    laserRect.top > enemyRect.bottom\n  );\n}\n\nfunction createExplosion(x, y) {\n  playShotBoomSound();\n  const explosion = document.createElement(\"img\");\n  explosion.src = \"assets/images/explosion.gif\";\n  explosion.className = \"explosion\";\n  explosion.style.width = \"fit-content\";\n  explosion.style.height = \"80px\";\n  explosion.style.left = x + 40 + \"px\";\n  explosion.style.top = y + \"px\";\n\n  gameContainer.appendChild(explosion);\n\n  setTimeout(() => {\n    gameContainer.removeChild(explosion);\n  }, 1000);\n}\n\nconst onMouseClickShot = () => {\n  if (!isGameStarted) {\n    startCreatingEnemies();\n    const body = document.querySelector(\"body\");\n    welcomeMessage.remove();\n    body.classList.add(\"start-animation\");\n    isGameStarted = true;\n  }\n\n  playShotSound();\n\n  const laser = document.createElement(\"div\");\n  laser.classList.add(\"laser\");\n  laser.style.left =\n    gamePlayer.offsetLeft + gamePlayer.offsetWidth / 2 - 15 + \"px\";\n  laser.style.top = gamePlayer.offsetTop + 40 + \"px\";\n  gameContainer.appendChild(laser);\n\n  const laserInterval = setInterval(() => {\n    laser.style.top = parseInt(laser.style.top) - 10 + \"px\";\n    if (laser.offsetTop < 0) {\n      clearInterval(laserInterval);\n      gameContainer.removeChild(laser);\n    } else {\n      const enemies = document.querySelectorAll(\".enemy\");\n      if (enemies.length > 0) {\n        enemies.forEach((enemy) => {\n          if (checkCollision(laser, enemy)) {\n            const collisionEvent = new CustomEvent(\"collision\", {\n              detail: { laser, enemy },\n            });\n            createExplosion(enemy.offsetLeft, enemy.offsetTop);\n            gameContainer.dispatchEvent(collisionEvent);\n          }\n        });\n      }\n    }\n  }, 10);\n\n  laser.style.transform = \"rotate(90deg)\";\n};\n\nmodule.exports = {\n  gameContainer,\n  onColideShotWithEnemy,\n  onMouseClickShot,\n};\n\n\n//# sourceURL=webpack://flight-game/./public/functions/playFunctions.js?");

/***/ }),

/***/ "./public/script.js":
/*!**************************!*\
  !*** ./public/script.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const { moveAirPlane } = __webpack_require__(/*! ./functions/airplaneFunctions.js */ \"./public/functions/airplaneFunctions.js\");\nconst {\n  gameContainer,\n  onColideShotWithEnemy,\n  onMouseClickShot,\n} = __webpack_require__(/*! ./functions/playFunctions.js */ \"./public/functions/playFunctions.js\");\n\nwindow.addEventListener(\"load\", () => {\n  document.body.classList.add(\"scrolling\");\n});\n\ngameContainer.addEventListener(\"mousemove\", moveAirPlane);\n\ngameContainer.addEventListener(\"collision\", onColideShotWithEnemy);\ngameContainer.addEventListener(\"mousedown\", onMouseClickShot);\n\n\n//# sourceURL=webpack://flight-game/./public/script.js?");

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
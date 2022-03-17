import getDataFromEnemyHandler from './interactionWithWebsocket/getDataFromEnemyHandler.js';
import {gameConstants} from './constants.js';
import shot from './interactionWithWebsocket/functions/shot.js';
import playSound from './playSound.js';
import buildGamePage from './buildGamePage.js';

export default function game() {
  const container = document.querySelector(".container");

  container.addEventListener("click", (event) => {
    if (event.target.classList.contains("startGameBtn")) {
      buildGamePage();
    }
    if (event.target.classList.contains("shipCell")) {
      playSound('click');
      const ship = event.target.parentNode;
      ship.style.flexDirection == "column"
        ? (ship.style.flexDirection = "row")
        : (ship.style.flexDirection = "column");
    }
    if (event.target.classList.contains("enemyCell")) {
      if(gameConstants.userShotStatus) shot(event.target);
    }
  });

  container.addEventListener('newDataFromEnemy', (event) => {
    getDataFromEnemyHandler(event.detail);
  });
}

game();
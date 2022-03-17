import shipsTemplate from './templates/shipsTemplate.js';
import createFields from "./createFields.js";
import fieldsBoxTemplate from "./templates/fieldsBoxTemplate.js";
import setDragAndDropShipsListeners from './setDragAndDropShipsListeners.js';
import changeEnemyShipPlacingStatus from './interactionWithWebsocket/functions/changeEnemyShipPlacingStatus.js';
import changeShotStatus from './interactionWithWebsocket/functions/changeShotStatus.js';
import {gameConstants} from './constants.js';


export default function buildGamePage() {
    const gameBox = document.querySelector(".gameBox");
    gameBox.innerHTML = "";
    gameBox.insertAdjacentHTML(
      "beforeend",
      fieldsBoxTemplate
    );
    createFields();
    gameBox.insertAdjacentHTML(
      "beforeend",
       shipsTemplate
    );
    if(gameConstants.enemyShipPlacementStatus){
      changeEnemyShipPlacingStatus();
    };
    changeShotStatus();
    setDragAndDropShipsListeners();
  };
  